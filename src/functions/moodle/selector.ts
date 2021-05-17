export default {
  login: {
    url: 'https://wsdmoodle.waseda.jp/login/index.php',
    button: '[title="Waseda University Login"]',
    username: '#j_username',
    password: '#j_password',
    submit: '#btn-save'
  },
  top: 'https://wsdmoodle.waseda.jp/my/',
  attendance: 'https://wsdmoodle.waseda.jp/mod/attendance/view.php?id=',
  content: 'https://wcms.waseda.jp/em',
  courceName: '.coursename',
  smallSlideBc: 'contents/web_files/slide/small_slide_',
  slide: '//*[contains(text(),"スライド")]/ancestor::a',
  original: (id: string) =>
    `https://wcms.waseda.jp/contents/WASEDA1001/${id}/contents/web_files/original.pdf`,
  totalNum: '.vc-pctrl-total-page',
  expand: '#toggles-all-opened',
  notification: '#user-notifications',
  menu: '#action-menu-toggle-1',
  logout: 'a[data-title="logout,moodle"]'
}
