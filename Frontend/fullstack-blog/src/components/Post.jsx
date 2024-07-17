import React from 'react'

export default function Post() {
  return (
    <div className="post">
        <div className="image">
          <img src="https://duet-cdn.vox-cdn.com/thumbor/0x0:600x337/828x552/filters:focal(300x169:301x170):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25515699/ducks.jpg" alt="" />
        </div>
        
        <div className="texts">
          <h2>The Verge’s favorite board and video games</h2>
          <p className="info">
            <a href="" className="author">Ashish Dhiwar</a>
            <time>2024-09-18 22:43</time>
          </p>
          <p className='summary'>When you want to escape from your day-to-day responsibilities, a good game can help.</p>
        </div>

      </div>
  )
}
