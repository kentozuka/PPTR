const selectors = {
  igBtnAtNavbar: '#media_manager_chrome_bar_instagram_icon',
  loginInWithIgBtn: '[role="button"]',
  usernameField: '[name="username"]',
  passwordField: '[name="password"]',
  loginBtn: '[type="submit"]',
  saveLaterBtn: '[type="button"]:nth-child(1)',
  carouselBtn: '[role="tab"]:nth-child(4)', // or [aria-label="カルーセル"]
  rowCell: '[role="cell"]',
  checkedCell: '[aria-checked="true"]',
  tooltipCell: '[data-hover="tooltip"]',
  modal: '#creator_studio_sliding_tray_root',
  modalCloseBtn: '#creator_studio_sliding_tray_root [role="button"]'
} as const

export default selectors
