import React from 'react'

const defaultNoticeText = "	© 2025 WSA. All Rights Reserved"

export default function CopyRightNotice({noticeText=defaultNoticeText}) {
  return (
    <div>
      {/* <p className='getting-started-copyright-text'>&copy; 2025 WSA. All Rights Reserved </p> */}
      <p className='getting-started-copyright-text'>{noticeText}</p>
    </div>
  )
}
