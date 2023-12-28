import { tw } from "typewind";
import Header from "../../components/Header";

export function IndexPage() {
  return (
    <>
    <div
      className={tw.bg_cover.bg_center.h_screen}
      style={{ backgroundImage: "url(/Hero.jpg)" }}
    >
      <Header />
      <div
        className={tw.flex.items_center.flex_col.justify_center.h_screen}
      >
        <span
          className={
            tw.w_96.text_7xl.text_primaryPink.font_semibold.tracking_tighter
          }
        >
          BEGIN YOUR JOURNALING ODYSSEY
        </span>
        <span
          className={
            tw.w_96.text_2xl.text_primaryPink.font_medium.tracking_tighter
          }
        >
          Discover, track, and relive your literary adventures in a single
          space.
        </span>
        <div className={tw.w_96.flex.items_start}>
          <div
            className={
              tw.px_4.py_3.rounded_xl.bg_black.shadow_lg.text_primaryPink
                .font_bold.tracking_tighter.mt_4
            }
          >
            JOIN THE CLUB
          </div>
        </div>
      </div>
      
    </div>
    <div className={tw.flex.flex_col.space_y_8.px_4.h_screen.w_full.bg_blackS1}>
        <span className={tw.text_5xl.text_primaryPink.tracking_tighter.font_bold.mt_4}>WE PROVIDE</span>
       <div className={tw.flex.flex_row.space_x_10.space_y_0.overflow_x_auto.w_full.text_white}>
          
             <div className={tw.border_2.border_white.rounded_xl.h_['580px'].min_w_['400px']}>
                <div className={tw.h_['320px'].w_full}><img src="../../../public/Hero.jpg"/></div>
                <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                    <span className={tw.text_primaryPink.tracking_tighter.text_3xl.text_center}> CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.</span>
                    <span className={tw.text_white.tracking_tighter.text_sm.text_center}>Immerse yourself in daily reflections with our digital journal feature. Capture fleeting thoughts, dreams, and musings in your own private sanctuary. Your personal space for self-discovery and expression.</span>
                </div>
            </div>
            <div className={tw.border_2.border_white.rounded_xl.h_['580px'].min_w_['400px']}>
                <div className={tw.h_['320px'].w_full}><img src="../../../public/Hero.jpg"/></div>
                <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                    <span className={tw.text_primaryPink.tracking_tighter.text_3xl.text_center}> CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.</span>
                    <span className={tw.text_white.tracking_tighter.text_sm.text_center}>Immerse yourself in daily reflections with our digital journal feature. Capture fleeting thoughts, dreams, and musings in your own private sanctuary. Your personal space for self-discovery and expression.</span>
                </div>
            </div>
            <div className={tw.border_2.border_white.rounded_xl.h_['580px'].min_w_['400px']}>
                <div className={tw.h_['320px'].w_full}><img src="../../../public/Hero.jpg"/></div>
                <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                    <span className={tw.text_primaryPink.tracking_tighter.text_3xl.text_center}> CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.</span>
                    <span className={tw.text_white.tracking_tighter.text_sm.text_center}>Immerse yourself in daily reflections with our digital journal feature. Capture fleeting thoughts, dreams, and musings in your own private sanctuary. Your personal space for self-discovery and expression.</span>
                </div>
            </div>
            <div className={tw.border_2.border_white.rounded_xl.min_h_['580px'].min_w_['400px']}>
                <div className={tw.h_['320px'].w_full}><img src="../../../public/Hero.jpg"/></div>
                <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                    <span className={tw.text_primaryPink.tracking_tighter.text_3xl.text_center}> CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.</span>
                    <span className={tw.text_white.tracking_tighter.text_sm.text_center}>Immerse yourself in daily reflections with our digital journal feature. Capture fleeting thoughts, dreams, and musings in your own private sanctuary. Your personal space for self-discovery and expression.</span>
                </div>
            </div>
            <div className={tw.border_2.border_white.rounded_xl.h_['580px'].min_w_['400px']}>
                <div className={tw.h_['320px'].w_full}><img src="../../../public/Hero.jpg"/></div>
                <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                    <span className={tw.text_primaryPink.tracking_tighter.text_3xl.text_center}> CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.</span>
                    <span className={tw.text_white.tracking_tighter.text_sm.text_center}>Immerse yourself in daily reflections with our digital journal feature. Capture fleeting thoughts, dreams, and musings in your own private sanctuary. Your personal space for self-discovery and expression.</span>
                </div>
            </div> 
        </div>
    </div>
    </>
  );
}
