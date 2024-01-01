
import { tw } from 'typewind'; 

const Header = () => {
  return (
    <>
<div className={tw.flex.flex_col.justify_between.space_y_4.items_center.bg_white.bg_opacity_30.px_4.w_full.h_['60px'].md(tw.flex.flex_row.justify_between.space_y_0).dark(tw.bg_black.bg_opacity_30)}>
    <span className={tw.text_4xl.font_semibold.text_primaryPink}>JOURNAL</span>
    <div className={tw.flex.flex_col.items_center.justify_end.space_x_0.space_y_2.text_primaryPink.text_xl.font_semibold.md(tw.flex.flex_row.space_x_2.space_y_0)}>
        <span>SIGNUP</span>
        <span>LOGIN</span>
        <span>ABOUT</span>
        <span>CONTACT US</span>
    </div>
</div>
</>
  )
}

export default Header