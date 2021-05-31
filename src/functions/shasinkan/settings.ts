export default [
  {
    name: 'genicbooth渋谷',
    type: 'api',
    url: 'ttps://coubic.com/api/v2/merchants/genicbooth/booking_pages/872535/events?course_id=212576&start=202105310000&end=202106060000&'
  },
  {
    name: 'storybooth',
    type: 'web',
    url: 'https://repitte.jp/line/web_booking/staff?store_id=3668&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVwaXR0ZS5qcCIsImF1ZCI6Imh0dHBzOlwvXC9yZXBpdHRlLmpwIiwiaWF0IjoxNjIyNDMxMTMxLCJleHAiOjE2MjI1MTc1MzEsImNvbnRleHQiOnsiY3VzdG9tZXIiOnsibGluZV9pZCI6IlVhYzI1Mzg0MDc3YmJkZGE1ZjQ5ZWFmZjY4YzU4MTE0YiJ9LCJ1c2VyIjp7InVzZXJfaWQiOiIzNjY4In19fQ.uDKmZvcA_dwrK91XaB3a-p-qhMY4vTsER2O1ZFwySUc'
  },
  {
    name: 'jp写真館(京都)',
    type: 'api',
    url: 'https://coubic.com/api/v2/merchants/jpbunpic/booking_pages/531882/events?course_id=377957&start=202105310000&end=202106060000&option_ids[]=14645&staff_id='
  },
  {
    name: 'setdunakan',
    type: 'web',
    url: 'https://repitte.jp/line/web_booking/store?store_id=2860&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVwaXR0ZS5qcCIsImF1ZCI6Imh0dHBzOlwvXC9yZXBpdHRlLmpwIiwiaWF0IjoxNjIyNDQwOTQ1LCJleHAiOjE2MjI1MjczNDUsImNvbnRleHQiOnsiY3VzdG9tZXIiOnsibGluZV9pZCI6IlUxYTQ2MDI2YmNmOGEwYzQzY2ZmNjE1YjQ0NzM3OTlhNSJ9LCJ1c2VyIjp7InVzZXJfaWQiOiIyODYwIn19fQ.mh0j26R5qKJShbCqsH8HsLuXS-W9MbwfRnDUeE2PGi4'
  }
] as const

export interface CoubicResponse {
  checkin_times: []
  dates: {
    [date: string]: {
      class: 'holiday' | 'active'
      availabilities?: {
        time: number
        value: string
        state: string
      }[]
    }
  }
  time_zone: 'Asia/Tokyo'
}
