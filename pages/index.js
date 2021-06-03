import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

function Home({ photo }) {

  const zeroPadding = (num, digit) => {
    let zero = ''
    for(let i = 0; i < digit; i++) {
        zero += '0'
    }
    return (zero + num).slice(-digit)
  }

  const updateTime = () => {
    const now = new Date()
    const time = getTime(now)
    setTime(time)
  }

  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const now = new Date()
  const date = zeroPadding(now.getFullYear(), 4) + '-' + zeroPadding(now.getMonth()+1, 2) + '-' + zeroPadding(now.getDate(), 2) + ' ' + week[now.getDay()]

  const getTime = (now) => zeroPadding(now.getHours(), 2) + ':' + zeroPadding(now.getMinutes(), 2) + ':' + zeroPadding(now.getSeconds(), 2)
  const [time, setTime] = useState(getTime(now))

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000)
    return () => { clearInterval(intervalId) }
  }, [time])


  return (
    <div className={styles.container}>
      <Head>
        <title>スクショ時計</title>
        <meta name="description" content="背景がおしゃれなだけのスクショ用時計" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className={styles.mainImage}
        src={photo}
        alt="Photo"
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
      <div className={styles.clock}>
        <p className={styles.clockDate}>{date}</p>
        <p className={styles.clockTime}>{time}</p>
      </div>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  // const res1 = await fetch("https://api.unsplash.com/search/photos?page=10&query=landscape-nature&orientation=portrait&client_id=cY2oNDOjEKdSoimX5Hbhe3dUjwzAug-xXbfGV-MNwzU")
  // const data = await res1.json()
  // const photos1 = data.results.map(result => result.urls.regular)

  // console.log('photos1', photos1)
  // console.log('photos1.length', photos1.length)

  // const res = await fetch("http://localhost:3000/api/photo")
  const res = await fetch("https://screenshot-clock.vercel.app/api/photo")
  const { photos } = await res.json()

  const photo = photos[Math.floor(Math.random() * photos.length)]

  return { photo }
}

export default Home