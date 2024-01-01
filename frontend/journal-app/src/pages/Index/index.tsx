import { tw } from "typewind";
import Header from "../../components/Header";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Tilt } from 'react-tilt';
import './index.css';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.15,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}


export function IndexPage() {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider !== null) {
      slider.scrollLeft = slider?.scrollLeft - 500;
    }
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider !== null) {
      slider.scrollLeft = slider?.scrollLeft + 500;
    }
  };
  return (
    <>
      <div
        className={tw.bg_cover.bg_center.h_screen}
        style={{ backgroundImage: "url(/Hero.jpg)" }}
      >
        <Header />
        <div className={tw.flex.items_center.flex_col.justify_center.h_screen}>
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
                tw.px_4.py_3.rounded_xl.bg_white.shadow_lg.text_primaryPink
                  .font_bold.tracking_tighter.mt_4.dark(tw.bg_black)
              }
            >
              JOIN THE CLUB
            </div>
          </div>
        </div>
      </div>
      <div
        className={tw.flex.flex_col.space_y_0.py_4.h_fit.w_full.bg_white.dark(tw.bg_blackS1)}
      >
        <div className={tw.px_4.mt_8}>
        <span
          className={
            tw.text_5xl.text_primaryPink.tracking_tighter.font_bold
          }
        >
          WE PROVIDE
        </span>
        <div className={tw.flex.relative.items_center.space_x_2}>
          <div
            className={tw.flex.items_center.rounded_full.bg_blackS1.bg_opacity_10.scale_75.hover(
              tw.bg_opacity_90.scale_90
            ).dark(tw.bg_lightGray.bg_opacity_30)}
          >
            <MdChevronLeft
              onClick={slideLeft}
              size={40}
              className={tw.text_primaryPink}
            />
          </div>
          <div
            id="slider"
            className={
              tw.flex.flex_row.space_x_0.space_y_0.overflow_x_auto.w_full
                .text_white.scrollbar_hide.h_full.px_0.py_0
            }
          >
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>
            <Tilt options={defaultOptions}>
            <div
              className={tw.rounded_xl.h_["580px"].min_w_[
                "400px"
              ].scale_75.shadow_lg.shadow_xl.shadow_primaryPink}
            >
              <div className={tw.h_["320px"].w_full.rounded_xl}>
                <img src="../../../public/Hero.jpg" className={tw.rounded_t_xl}/>
              </div>
              <div className={tw.py_4.px_1.flex.flex_col.items_start.space_y_6}>
                <span
                  className={
                    tw.text_primaryPink.tracking_tighter.text_3xl.text_center
                  }
                >
                  {" "}
                  CAPTURE DAILY THOUGHTS AND DREAMS IN YOUR DIGITAL SANCTUARY.
                </span>
                <span
                  className={tw.text_black.tracking_tighter.text_sm.text_center.dark(tw.text_white)}
                >
                  Immerse yourself in daily reflections with our digital journal
                  feature. Capture fleeting thoughts, dreams, and musings in
                  your own private sanctuary. Your personal space for
                  self-discovery and expression.
                </span>
              </div>
            </div>
            </Tilt>

          </div>
          <div
            className={tw.flex.items_center.rounded_full.bg_blackS1.bg_opacity_10.scale_75.hover(
              tw.bg_opacity_90.scale_90
            ).dark(tw.bg_lightGray.bg_opacity_30)}
          >
          <MdChevronRight
            onClick={slideRight}
            size={40}
            className={tw.text_primaryPink}
          />
          </div>
        </div>
        </div>
        <section className={tw.relative.h_32.overflow_hidden}>
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </section>
        
      </div>
      <div
        className={tw.flex.flex_col.space_y_10.px_4.py_4.h_fit.w_full.bg_white.dark(tw.bg_blackS1)}
      >
        <span
          className={
            tw.text_5xl.text_primaryPink.tracking_tighter.font_bold.mt_4
          }
        >
          TESTIMONY
        </span>
        <div className={tw.p_10.grid.grid_cols_1.gap_6.md(tw.grid_cols_2.gap_2).lg(tw.grid_cols_3.gap_20)}>
          <div className={tw.flex.space_x_2.rounded_full.w_['420px'].h_40.border_0.hover(tw.scale_110.text_4xl)}>
            <div className={tw.flex.flex_col.space_y_1.justify_center.items_center.w_['2/3'].pl_8}>
              <span className={tw.text_primaryPink.text_lg.font_bold.tracking_tighter.italic}>"This platform has transformed the way I engage with books and document my thoughts. A must-try for every book lover!"</span>
              <span className={tw.text_darkGray.font_thin.text_xl.pl_32.italic.dark(tw.text_white)}>Dr. Abebe</span>
            </div>
            <div className={tw.rounded_full.w_['1/3'].flex.items_center.justify_center}>
            <img src="/Hero.jpg" className={tw.rounded_full.w_['130px'].h_['130px']}/>
            </div>
          </div>
          <div className={tw.flex.space_x_2.rounded_full.w_['420px'].h_40.border_0.hover(tw.scale_110.text_4xl)}>
            <div className={tw.flex.flex_col.space_y_1.justify_center.items_center.w_['2/3'].pl_8}>
              <span className={tw.text_primaryPink.text_lg.font_bold.tracking_tighter.italic}>"This platform has transformed the way I engage with books and document my thoughts. A must-try for every book lover!"</span>
              <span className={tw.text_darkGray.font_thin.text_xl.pl_32.italic.dark(tw.text_white)}>Dr. Abebe</span>
            </div>
            <div className={tw.rounded_full.w_['1/3'].flex.items_center.justify_center}>
            <img src="/Hero.jpg" className={tw.rounded_full.w_['130px'].h_['130px']}/>
            </div>
          </div>
          <div className={tw.flex.space_x_2.rounded_full.w_['420px'].h_40.border_0.hover(tw.scale_110.text_4xl)}>
            <div className={tw.flex.flex_col.space_y_1.justify_center.items_center.w_['2/3'].pl_8}>
              <span className={tw.text_primaryPink.text_lg.font_bold.tracking_tighter.italic}>"This platform has transformed the way I engage with books and document my thoughts. A must-try for every book lover!"</span>
              <span className={tw.text_darkGray.font_thin.text_xl.pl_32.italic.dark(tw.text_white)}>Dr. Abebe</span>
            </div>
            <div className={tw.rounded_full.w_['1/3'].flex.items_center.justify_center}>
            <img src="/Hero.jpg" className={tw.rounded_full.w_['130px'].h_['130px']}/>
            </div>
          </div>
          <div className={tw.flex.space_x_2.rounded_full.w_['420px'].h_40.border_0.hover(tw.scale_110.text_4xl)}>
            <div className={tw.flex.flex_col.space_y_1.justify_center.items_center.w_['2/3'].pl_8}>
              <span className={tw.text_primaryPink.text_lg.font_bold.tracking_tighter.italic}>"This platform has transformed the way I engage with books and document my thoughts. A must-try for every book lover!"</span>
              <span className={tw.text_darkGray.font_thin.text_xl.pl_32.italic.dark(tw.text_white)}>Dr. Abebe</span>
            </div>
            <div className={tw.rounded_full.w_['1/3'].flex.items_center.justify_center}>
            <img src="/Hero.jpg" className={tw.rounded_full.w_['130px'].h_['130px']}/>
            </div>
          </div>
          <div className={tw.flex.space_x_2.rounded_full.w_['420px'].h_40.border_0.hover(tw.scale_110.text_4xl)}>
            <div className={tw.flex.flex_col.space_y_1.justify_center.items_center.w_['2/3'].pl_8}>
              <span className={tw.text_primaryPink.text_lg.font_bold.tracking_tighter.italic}>"This platform has transformed the way I engage with books and document my thoughts. A must-try for every book lover!"</span>
              <span className={tw.text_darkGray.font_thin.text_xl.pl_32.italic.dark(tw.text_white)}>Dr. Abebe</span>
            </div>
            <div className={tw.rounded_full.w_['1/3'].flex.items_center.justify_center}>
            <img src="/Hero.jpg" className={tw.rounded_full.w_['130px'].h_['130px']}/>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
