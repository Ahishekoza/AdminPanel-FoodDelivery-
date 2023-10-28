import React from 'react'
import './HomePage.css'
import Card from '../../components/card/Card'

export const HomePage = () => {
  return (
    <div className='homepage'>
      <h1>Admin Panel</h1>
      <div className='homePanelContainer'>
       <Card title={'Add Food'} navigatePage={'/addfood'} />
       <Card title={'Ordered Food'} navigatePage={'/orderdFood'}/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </div>
    </div>
  )
}

