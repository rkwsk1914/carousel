import $ from 'jquery'
import { MySlider } from './modules/MySlider'
import '../../css/shared/style.css'
import '../../scss/shared/style.scss'
import '../../css/shared/MySlider.css'

/*
--------------------------------------------------
 * 【設定の概要】
  -----------------------------------------------
 * type
 *    カルーセルのタイプ設定
 *    1: スライドコンテンツを要素いっぱいに表示
 *    2: スライドコンテンツを要素半分のサイズにし、カルーセル中央に表示。
 *       表示両サイドで、隣のスライドコンテンツが見える仕様。
 * id
 *    カルーセルを設定するulタグを囲うdivタグの要素のID属性
 * speed
 *    スライドスピードの設定
 *    ミリ秒で設定
 * start_posittion
 *    最初に表示するスライド（liタグ）を何番目にするか、未入力なら最初のスライド（liタグ）
 * auto_slide
 *    カルーセルの自動スライド機能の設定
 *    ON: true / OFF: false
 * interval
 *    カルーセルの自動スライドのインターバルの設定
 *    未入力なら5秒置きに自動スライド
 * navi
 *    カルーセル下にドットスライドナビゲーションを設置するか設定
 *    ON: true / OFF: false
 * navi_img
 *    カルーセル下にイメージスライドナビゲーションを設置するか設定
 *    ON: true / OFF: false
 * side_button
 *    カルーセルの両サイドに次へボタン / 戻るボタンを設置するか設定
 *    fullがtrueのときは生成しない
 *    次へボタン：  一つ次のスライドへ移動
 *    戻るボタン；  一つ前のスライドへ移動
 *    ON: true / OFF: false
 * next_button
 *    オリジナルの次へボタンの設定
 *    次へボタンに設定するHTMLタグを設定
 *    fullがtrueのときは生成しない
 *    side_buttonがtrueのとき、side_buttonが優先される
 * back_button
 *    オリジナルの戻るボタンの設定
 *    戻るボタンに設定するHTMLタグを設定
 *    fullがtrueのときは生成しない
 *    side_buttonがtrueのとき、side_buttonが優先される
--------------------------------------------------
*/
/*
const config = {
  speed: 300,
  start_posittion: 3,
  auto_slide: true,
  interval: 5000,
  navi: true,
  side_button: false,
  full: true,
  type: 1,
  next_button: '<span>つぎへ</span>',
  back_button: '<button>まえへ</button>'
}
*/
/*
--------------------------------------------------
 * メイン
--------------------------------------------------
*/
$(window).on('load', () => {
  const slider1 = new MySlider('#slide1')
  const slider2 = new MySlider('#slide2')
  const slider3 = new MySlider('#slide3')
  const slider4 = new MySlider('#slide4')
  const slider5 = new MySlider('#slide5')
  const slider6 = new MySlider('#slide6')
  const slider7 = new MySlider('#slide7')
  const slider8 = new MySlider('#slide8')
  const slider9 = new MySlider('#slide9')
  const slider10 = new MySlider('#slide10')

  slider1.Initialie({
    speed: 300,
    auto_slide: true
  })
  slider2.Initialie({
    speed: 300,
    auto_slide: true,
    navi: true
  })
  slider3.Initialie({
    speed: 300,
    auto_slide: false,
    navi_img: true
  })
  slider4.Initialie({
    speed: 300,
    auto_slide: false,
    navi: true,
    side_button: true
  })
  slider5.Initialie({
    speed: 300,
    auto_slide: false,
    navi: true,
    next_button: '<button class="btn">next</button>',
    back_button: '<button class="btn">previous</button>'
  })
  slider6.Initialie({
    speed: 300,
    auto_slide: false,
    navi: true,
    full: true
  })
  slider7.Initialie({
    speed: 300,
    auto_slide: false,
    navi: true,
    type: 2,
    side_button: true
  })
  slider8.Initialie({
    speed: 300,
    auto_slide: true,
    navi: true,
    type: 2,
    full: true
  })
  slider9.Initialie({
    speed: 300,
    auto_slide: true,
    navi: true,
    side_button: true
  })
  slider10.Initialie({
    speed: 300,
    auto_slide: true,
    navi: true,
    side_button: true
  })
})
