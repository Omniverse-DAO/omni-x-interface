import React, { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { NextPage } from 'next'
import { Listbox, Transition, Switch } from '@headlessui/react'

import Discord from '../../../public/images/discord.png'
import Twitter from '../../../public/images/twitter.png'
import Web from '../../../public/images/web.png'
import Ethereum from '../../../public/sidebar/ethereum.png'

import { getCollectionNFTs, selectCollectionNFTs, getCollectionInfo, selectCollectionInfo, clearCollectionNFTs, selectGetNFTs, getCollectionOwners, selectCollectionOwners } from '../../../redux/reducers/collectionsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import NFTBox from '../../../components/collections/NFTBox'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'

import LazyLoad from 'react-lazyload'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Chip from '@material-ui/core/Chip'
import classNames from '../../../helpers/classNames'
import editStyle from '../../../styles/collection.module.scss'
import { info } from 'console'

const sort_fields = [
  { id: 1, name: 'price: low to high', value: 'price', unavailable: false },
  { id: 2, name: 'price: high to low', value: '-price', unavailable: false },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordion: {
      width: '100%',
      boxShadow: 'none',
      '& .MuiAccordionDetails-root': {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem'
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
      color: 'rgb(108 117 125)',
      fontWeight: 600,
    },
    frmGroup: {
      width: '100%',
      maxHeight: '320px',
      display: 'block',
      overflowY: 'auto',
      overflowX: 'hidden',
      marginTop: '1rem',
      padding: '1rem',
    },
    frmLabel: {
      width: '100%'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#423e3e26',
      '&:hover': {
        backgroundColor: '#423e3e40',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
      '&:hover': {
        boxShadow: 'none',
      },
      '&:focus': {
        boxShadow: 'none',
      },
    },
    chipRoot: {
      marginRight: '5px',
      marginTop: '5px'
    }
  }),
)

const Collection: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('items')
  const [expandedMenu, setExpandedMenu] = useState(0)
  const [selected, setSelected] = useState(sort_fields[0])
  const [enabled, setEnabled] = useState(false)

  const [hasMoreNFTs, setHasMoreNFTs] = useState(true)

  const router = useRouter()
  
  const col_url = router.query.Collection as string
  const display_per_page = 20
  const [page, setPage] = useState(0)

  const dispatch = useDispatch()
  const nfts = useSelector(selectCollectionNFTs)
  const collectionInfo = useSelector(selectCollectionInfo)
  const collectionOwners = useSelector(selectCollectionOwners)

  const [imageError, setImageError] = useState(false)
  const classes = useStyles()

  const [searchObj, setSearchObj] = useState<any>({})
  const [filterObj, setFilterObj] = useState<any>({})
  const [clearFilter, setClearFilter] = useState(false)

  const finishedGetting = useSelector(selectGetNFTs)

  useEffect(() => {
    if ( col_url ) {
      dispatch(getCollectionInfo(col_url) as any)
      dispatch(getCollectionOwners(col_url) as any)
      setPage(0)
    }
  }, [col_url])

  const onChangeSort = (item: any) => {
    setSelected(item)
    dispatch(clearCollectionNFTs() as any)
    dispatch(getCollectionNFTs(col_url, 0, display_per_page, item.value, searchObj) as any)
    setPage(0)
  }

  useEffect(() => {
    if( (collectionInfo && nfts.length >= collectionInfo.count) || finishedGetting ) {
      setHasMoreNFTs(false)
    }
  }, [nfts, selectGetNFTs])

  useEffect(() => {
    if ( collectionInfo ) {
      dispatch(clearCollectionNFTs() as any)
      dispatch(getCollectionNFTs(col_url, 0, display_per_page, selected.value, searchObj) as any)
      setPage(0)
    }
  }, [searchObj])

  const fetchMoreData = () => {
    if( collectionInfo && nfts.length >= collectionInfo.count ) {
      setHasMoreNFTs(false)
      return
    }
    setTimeout(() => {
      if ( col_url ) {
        dispatch(getCollectionNFTs(col_url, page + 1, display_per_page, selected.value, searchObj) as any)
        setPage(page + 1)
      }
    }, 500)
  }

  const searchAttrsCheck = (bChecked: boolean, attrKey: string, valueKey: string) => {
    const obj = Array.isArray(searchObj[attrKey]) ? searchObj[attrKey] : []

    if(bChecked) {
      obj.push(valueKey)
    } else {
      const index = obj.indexOf(valueKey, 0)
      if (index > -1) {
        obj.splice(index, 1)
      }
    }
    const newObj = {[attrKey]: obj}
    setSearchObj((prevState: any) => {
      return {...prevState, ...newObj}
    })
    let existFilter = false
    Object.keys(searchObj).map((aKey) => {
      if(searchObj[aKey].length > 0) {
        existFilter = true
      }
    })
    if(bChecked || existFilter) {
      setClearFilter(true)
    }
  }
  
  const searchFilter = (searchValue: string, attrKey: string) => {
    const newObj = {[attrKey]: searchValue}
    setFilterObj((prevState: any) => {
      return {...prevState, ...newObj}
    })
  }

  const handleFilterBtn = (attrKey: string, item: string) => {
    const obj = searchObj[attrKey]
    const index = obj.indexOf(item, 0)
    if (index > -1) {
      obj.splice(index, 1)
    }
    const newObj = {[attrKey]: obj}
    setSearchObj((prevState: any) => {
      return {...prevState, ...newObj}
    })
  }

  return (
    <>
      <div className={classNames('w-full', 'mt-20', 'pr-[70px]', 'relative', editStyle.collection)}>
        <div className="w-[100%] h-[100%] mt-20">
          <img className={classNames(editStyle.bannerImg)} src={collectionInfo&&collectionInfo.banner_image ? collectionInfo.banner_image : ''} />
          <div className={classNames(editStyle.bannerOpacity)} />
        </div>
        <div className="grid grid-cols-13 mt-20">
          <div className="col-span-1"></div>
          <div className="2xl:col-span-1 xl:col-span-2 md:col-span-2">
            <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="logo" />}>
              <img src={imageError?'/images/omnix_logo_black_1.png':(collectionInfo&&collectionInfo.profile_image ? collectionInfo.profile_image : '/images/omnix_logo_black_1.png')} alt="logo" onError={(e)=>{setImageError(true)}} data-src={collectionInfo&&collectionInfo.profile_image ? collectionInfo.profile_image : ''} />
            </LazyLoad>
          </div>
          <div className="2xl:col-span-9 xl:col-span-8 md:col-span-8 px-8 pt-3">
            <div>
              <p className="text-[#1E1C21] font-['Roboto Mono'] text-3xl uppercase font-bold">{collectionInfo?collectionInfo.name:''}</p>
            </div>
            <div className="flex justify-start mt-5">
              <div>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">items</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">{collectionInfo?collectionInfo.count:0}</p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">holders</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">{collectionOwners}</p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">floor</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">
                  <span className='mr-3'>0</span><Image src={Ethereum} height={25} width={23} alt="" />
                </p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">sales tax</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">0%</p>
              </div>
            </div>
            <div className='mt-8'>
              <ul className="flex flex-wrap relative justify-item-stretch text-sm font-medium text-center text-gray-500">
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='items'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('items')}>items</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='activity'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('activity')}>activity</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='stats'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('stats')}>stats</li>
              </ul>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mt-4"><button className="px-5 py-2 text-[#ADB5BD] font-['Roboto Mono'] text-lg border-2 border-[#ADB5BD] rounded-[22px]">+ watchlist</button></div>
            <div className="mt-7">
              { collectionInfo&&collectionInfo.discord &&
                <Link href={collectionInfo.discord}>
                  <a className="p-2">
                    <Image src={Discord} width={25} height={21} alt='discord' />
                  </a>
                </Link>
              }
              { collectionInfo&&collectionInfo.twitter &&
                <Link href={collectionInfo.twitter}>
                  <a className="p-2">
                    <Image src={Twitter} alt='twitter' />
                  </a>
                </Link>
              }
              { collectionInfo&&collectionInfo.website &&
                <Link href={collectionInfo.website}>
                  <a className="p-2">
                    <Image src={Web} alt='website' />
                  </a>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-2 border-[#E9ECEF] pr-[70px]">
        <div className="flex">
          <div className="w-[320px] min-w-[320px]">
            <ul className='flex flex-col space-y-4'>
              <li className="w-full">
                <div
                  className={`w-full px-4 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Buy Now
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-[#E9ECEF]' : 'bg-[#E9ECEF]'}
                    pull-right relative inline-flex h-[22px] w-[57px] shrink-0 cursor-pointer rounded-full border-2 border-[#6C757D] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? 'translate-x-6' : 'translate-x-px'}
                        pointer-events-none inline-block h-[16px] w-[28px] transform rounded-full bg-[#6C757D] shadow-lg ring-0 transition duration-200 ease-in-out mt-px`}
                    />
                  </Switch>
                </div>
              </li>
              { collectionInfo && collectionInfo.attrs && Object.keys(collectionInfo.attrs).map((key, idx) => {
                const attrs = collectionInfo.attrs
                return <li className="w-full" key={idx}>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {searchFilter(e.target.value, key)}}
                          />
                        </div>
                        <FormGroup classes={{root:classes.frmGroup}}>
                          {
                            attrs[key].values && Object.keys(attrs[key].values).map((valueKey, valueIndex) => {
                              if(valueKey == 'none') {
                                return null
                              }
                              if(filterObj[key] && !valueKey.includes(filterObj[key].toLowerCase())) {
                                return null
                              }
                              return <FormControlLabel
                                key={valueIndex}
                                classes={{label:classes.frmLabel, root: classes.frmLabel}}
                                control={<Checkbox checked={Array.isArray(searchObj[key]) && searchObj[key].indexOf(attrs[key].values[valueKey][3], 0) > -1 ? true : false} onChange={(e) => {searchAttrsCheck(e.target.checked, key, attrs[key].values[valueKey][3])}} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />}
                                label={
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[#4d5358]">{attrs[key].values[valueKey][3]}</span>
                                    <div className="text-right">
                                      <p className="font-bold text-[#697077]">{attrs[key].values[valueKey][4]}</p>
                                      <p className="text-[11px] text-[#697077]">({attrs[key].values[valueKey][1]}%)</p>
                                    </div>
                                  </div>
                                }
                              />
                            })
                          }
                        </FormGroup>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </li>
              })}
              {/* <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Price
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Blockchain
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Rarity
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Attributes
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li> */}
            </ul>
          </div>
          <div className="px-12 py-6 border-l-2 border-[#E9ECEF]">
            <div className="flex flex-row-reverse gap-4">
              <div className="min-w-[180px] z-10">
                <Listbox value={selected} onChange={onChangeSort}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#E9ECEF] py-2 pl-3 pr-10 text-lg text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <i className="fa fa-chevron-down"></i>
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#E9ECEF] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {sort_fields.map((sort_item, sortIdx) => (
                          <Listbox.Option
                            key={sortIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={sort_item}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {sort_item.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <i className="fa fa-chevron-down h-5 w-5"></i>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div>
                <button className="rounded-lg bg-[#38B000] text-[#F8F9FA] text-lg px-6 py-2 sm:text-sm">make a collection bid</button>
              </div>
            </div>
            <div className="mt-5">
              {
                clearFilter &&
                <Chip label="Clear Filters" variant="outlined" onClick={() => {setClearFilter(false), setSearchObj({})}} classes={{ root: classes.chipRoot }}/>
              }
              {
                Object.keys(searchObj).map((attrKey, attrIndex) => {
                  return searchObj[attrKey].map((item: any, index: any) => {
                    return <Chip
                      label={item}
                      onClick={() => handleFilterBtn(attrKey, item)}
                      onDelete={() => handleFilterBtn(attrKey, item)}
                      key={index}
                      classes={{ root: classes.chipRoot }}
                    />
                  })
                })
              }
            </div>
            <div className="mt-10">
              {
                Array.isArray(nfts) &&
                <InfiniteScroll
                  dataLength={nfts.length}
                  next={fetchMoreData}
                  hasMore={hasMoreNFTs}
                  loader={
                    <div className='flex justify-center items-center'>
                      <div className="flex justify-center items-center w-[90%] h-[100px]">
                        <CircularProgress />
                      </div>
                    </div>
                  }
                  endMessage={
                    <div></div>
                  }
                >
                  <div className="grid 2xl:grid-cols-5 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    { nfts.map((item, index) => {
                      return (
                        <NFTBox nft={item} index={index} key={index} col_url={col_url} chain={collectionInfo?collectionInfo.chain:'eth'}/>
                      )
                    })}
                  </div>
                </InfiniteScroll>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection