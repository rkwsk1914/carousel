import $ from 'jquery'

/**
 * MySliderオブジェトの生成
 */
export const MySlider = function (ID) {
  $(ID).addClass('rotation-slider')
  /* オブジェクト定数 */
  this.$carousel = $(`${ID}.rotation-slider`)
  this.$frameDiv = $('<div class="rotation-slider-frame"></div>')
  this.$ul = $(`${ID}.rotation-slider ul`)
  this.$li = $(`${ID}.rotation-slider li`)
  this.liId = `${ID}.rotation-slider li`
  this.liFirst = 0
  this.liLast = this.$li.length - 1
  this.$navDiv = $('<div class="rotation-slider-navi"></div>')
  this.$navDivImg = $('<div class="rotation-slider-navi-img"></div>')
  this.$backButton = $('<span class="rotation-slider-back-button"></span>')
  this.$nextButton = $('<span class="rotation-slider-next-button"></span>')

  /* オブジェクト内部変数 */
  this.POS = 1
  this.ID = ID
  this.autoSlideID = null

  /* コンフィグデータ */
  this.config = {
    speed: null,
    interval: null,
    navi: null,
    full: true,
    type: null
  }
}

/**
 * カルーセル初期化
 * タイプ1
 */
MySlider.prototype.InitializeUl = function () {
  /* フレームの追加 */
  $(this.$ul).wrap(this.$frameDiv)
  const $frame = $(`${this.ID} > .rotation-slider-frame`)

  /* フルサイズの設定 */
  if (this.config.full === true) {
    $($frame).addClass('full')
  }

  /* 最初と最後のスライドのクローンの生成 */
  const newli = $(this.liId)
  this.$ul.append($(newli[this.liFirst]).clone())
  this.$ul.prepend($(newli[this.liLast]).clone())

  /* 初期ポジションの設定 */
  const frameWidth = $($frame).outerWidth()
  const width = frameWidth * $(this.liId).length
  const xpoint = -(((frameWidth) * this.POS))
  this.$ul.css({
    width: `${width}px`,
    transition: 'none',
    transform: `translateX(${xpoint}px)`
  })

  /* スライドのliタグの横幅を設定 */
  $(this.liId).css({
    width: `${frameWidth}px`,
    transition: `opacity ${this.config.speed}ms ease`
  })

  /* スライドのliタグにポジションのデータ属性を設定 */
  for (let i = 0; i < this.$li.length; i++) {
    if (this.POS === (i + 1)) {
      $(this.$li[i]).addClass('current')
    }
    $(this.$li[i]).attr('data-pos', (i + 1))
  }
  this.setTransion()
}

/**
 * カルーセル初期化
 * タイプ2
 */
MySlider.prototype.InitializeUlVerSeccond = function () {
  /* フレームの追加 */
  $(this.$ul).wrap(this.$frameDiv)
  const $frame = $(`${this.ID} > .rotation-slider-frame`)

  /* フルサイズの設定 */
  if (this.config.full === true) {
    $($frame).addClass('full')
  }

  /* 最初と最後のスライドのクローンの生成 */
  const newli = $(this.liId)
  this.$ul.append($(newli[this.liFirst]).clone())
  this.$ul.append($(newli[this.liFirst + 1]).clone())
  this.$ul.prepend($(newli[this.liLast]).clone())

  /* 初期ポジションの設定 */
  const frameWidth = $($frame).outerWidth()
  const width = frameWidth * $(this.liId).length
  const xpoint = -(((frameWidth / 2) * this.POS)) + (frameWidth / 4)
  this.$ul.css({
    width: `${width}px`,
    transition: 'none',
    transform: `translateX(${xpoint}px)`
  })

  /* スライドのliタグの横幅を設定 */
  $(this.liId).css({
    width: `${frameWidth / 2}px`,
    transition: `opacity ${this.config.speed}ms ease`
  })

  /* スライドのliタグにポジションのデータ属性を設定 */
  for (let i = 0; i < this.$li.length; i++) {
    if (this.POS === (i + 1)) {
      $(this.$li[i]).addClass('current')
    }
    $(this.$li[i]).attr('data-pos', (i + 1))
  }

  this.setTransion()
}

/**
 * スライドアニメーション設定
 */
MySlider.prototype.setTransion = function () {
  setTimeout(() => {
    this.$ul.css({
      transition: `transform ease-in ${this.config.speed}ms`
    })
  }, 50)
}

/**
 * サイドボタンの初期設定
 */
MySlider.prototype.InitializeSideButton = function () {
  console.log('InitializeSideButton')
  this.$carousel.prepend(this.$backButton)
  this.$carousel.append(this.$nextButton)

  /* つぎへボタンを押したら */
  $(`${this.ID} > .rotation-slider-back-button`).on('click', () => {
    clearInterval(this.autoSlideID)
    this.POS = this.POS - 1
    this.moveUl()
    this.setAutoSlide()
  })

  /* 戻るボタンを押したら */
  $(`${this.ID} > .rotation-slider-next-button`).on('click', () => {
    clearInterval(this.autoSlideID)
    this.POS = this.POS + 1
    this.moveUl()
    this.setAutoSlide()
  })
}

/**
 * オリジナルサイドボタンの初期設定
 * @param {*オリジナル次へボタン} NEXTBTN
 * @param {*オリジナル前へボタン} BACKBTN
 */
MySlider.prototype.InitializeOriginalSideButton = function (NEXTBTN, BACKBTN) {
  console.log(this.$carousel)
  this.setClassBackOriginalButton(BACKBTN)
  this.setClassNextOriginalButton(NEXTBTN)

  $(`${this.ID} > .rotation-slider-back-button2`).on('click', () => {
    clearInterval(this.autoSlideID)
    this.POS = this.POS - 1
    this.moveUl()
    this.setAutoSlide()
  })

  $(`${this.ID} > .rotation-slider-next-button2`).on('click', () => {
    clearInterval(this.autoSlideID)
    this.POS = this.POS + 1
    this.moveUl()
    this.setAutoSlide()
  })
}

/**
 * オリジナル次へボタンにクラス付与
 * @param {*オリジナル次へボタン} NEXTBTN
 */
MySlider.prototype.setClassNextOriginalButton = function (NEXTBTN) {
  const ButtonTag = $(NEXTBTN).prop('tagName')
  const ButtonVal = $(NEXTBTN).text()
  this.$carousel.prepend(NEXTBTN)
  const newElement = this.$carousel.children(ButtonTag)
  const newElementParam = Object.keys(newElement)
  newElementParam.forEach((key) => {
    if (isFinite(key)) {
      if ($(newElement[key]).text() === ButtonVal) {
        $(newElement[key]).addClass('rotation-slider-next-button2')
      }
    }
  })
}

/**
 * オリジナル前へボタンにクラス付与
 * @param {*オリジナル前へボタン} BACKBTN
 */
MySlider.prototype.setClassBackOriginalButton = function (BACKBTN) {
  const ButtonTag = $(BACKBTN).prop('tagName')
  const ButtonVal = $(BACKBTN).text()
  this.$carousel.append(BACKBTN)
  const newElement = this.$carousel.children(ButtonTag)
  const newElementParam = Object.keys(newElement)
  newElementParam.forEach((key) => {
    if (isFinite(key)) {
      if ($(newElement[key]).text() === ButtonVal) {
        $(newElement[key]).addClass('rotation-slider-back-button2')
      }
    }
  })
}

/**
 * ドットナビゲーションの初期設定
 */
MySlider.prototype.InitializeNavi = function () {
  let $navItem
  this.$carousel.append(this.$navDiv)
  const $nav = $(`${this.ID} > .rotation-slider-navi`)
  for (let i = 1; i <= this.$li.length; i++) {
    if (i === this.POS) {
      $navItem = $(`<div class="nav-item current" data-POS="${i}"></div>`)
    } else {
      $navItem = $(`<div class="nav-item" data-POS="${i}"></div>`)
    }
    $nav.append($navItem)
  }

  /* ドットナビゲーションのクリックイベント */
  $(`${this.ID} .nav-item`).on('click', (event) => {
    clearInterval(this.autoSlideID)
    const $item = $(event.target)
    this.POS = Number($($item).attr('data-pos'))
    this.moveUl()
    this.setAutoSlide()
  })
}

/**
 * ドットナビゲーションの表示変更処理
 * 現在表示しているカルーセルアイテムを表示
 */
MySlider.prototype.setCurrentSlide = function () {
  $(`${this.ID} > .rotation-slider-frame li.current`).removeClass('current')
  $(`${this.ID} > .rotation-slider-frame li[data-pos="${this.POS}"]`).addClass('current')
  switch (this.config.navi) {
    case 'dot':
      $(`${this.ID} > .rotation-slider-navi > .current`).removeClass('current')
      $(`${this.ID} > .rotation-slider-navi > div[data-pos="${this.POS}"]`).addClass('current')
      break
    case 'img':
      $(`${this.ID} > .rotation-slider-navi-img > .current`).removeClass('current')
      $(`${this.ID} > .rotation-slider-navi-img > div[data-pos="${this.POS}"]`).addClass('current')
      break
    default:
      break
  }
}

/**
 * 自動スライド機能
 */
MySlider.prototype.setAutoSlide = function () {
  if (this.config.interval) {
    this.autoSlideID = setInterval(() => {
      this.POS = this.POS + 1
      this.moveUl()
    }, this.config.interval)
  }
}

/**
 * スライド処理 条件分岐
 */
MySlider.prototype.moveUl = function () {
  console.log(this.config.type)
  /* カルーセル初期化 */
  switch (this.config.type) {
    case 1:
      this.moveUltype1()
      break
    case 2:
      this.moveUltype2()
      break
    default:
      this.moveUltype1()
      break
  }
}

/**
 * タイプ1
 * スライド処理
 */
MySlider.prototype.moveUltype1 = function () {
  let xpoint = -(($(this.$li).outerWidth()) * (this.POS))
  this.$ul.css({
    transform: `translateX(${xpoint}px)`
  })

  if (this.POS === this.$li.length + 1) {
    this.POS = 1
    xpoint = -(($(this.$li).outerWidth()) * (this.POS))
    setTimeout(() => {
      this.$ul.css({
        transition: 'none',
        transform: `translateX(${xpoint}px)`
      })
      this.setTransion()
    }, this.config.speed)
  } else if (this.POS === 0) {
    this.POS = 4
    xpoint = -(($(this.$li).outerWidth()) * (this.POS))
    setTimeout(() => {
      this.$ul.css({
        transition: 'none',
        transform: `translateX(${xpoint}px)`
      })
      this.setTransion()
    }, this.config.speed)
  }
  this.setCurrentSlide()
}

/**
 * タイプ2
 * スライド処理
 */
MySlider.prototype.moveUltype2 = function () {
  const $frame = $(`${this.ID} > .rotation-slider-frame`)
  const frameWidth = $($frame).outerWidth()
  let xpoint = -(($(this.$li).outerWidth()) * (this.POS)) + (frameWidth / 4)
  this.$ul.css({
    transform: `translateX(${xpoint}px)`
  })

  if (this.POS === this.$li.length + 1) {
    this.POS = 1
    xpoint = -(($(this.$li).outerWidth()) * (this.POS)) + (frameWidth / 4)
    setTimeout(() => {
      this.$ul.css({
        transition: 'none',
        transform: `translateX(${xpoint}px)`
      })
      this.setTransion()
    }, this.config.speed)
  } else if (this.POS === 0) {
    this.POS = 4
    xpoint = -(($(this.$li).outerWidth()) * (this.POS)) + (frameWidth / 4)
    setTimeout(() => {
      this.$ul.css({
        transition: 'none',
        transform: `translateX(${xpoint}px)`
      })
      this.setTransion()
    }, this.config.speed)
  }
  this.setCurrentSlide()
}

/**
 * イメージナビゲーションの初期設定
 */
MySlider.prototype.InitializeNaviImg = function () {
  let $navItem
  let $navItemImg
  let navItemImgSrc
  let navItemImgAlt
  this.$carousel.append(this.$navDivImg)
  const $nav = $(`${this.ID} > .rotation-slider-navi-img`)
  for (let i = 0; i < this.$li.length; i++) {
    navItemImgSrc = $(this.$li[i]).find('img').attr('src')
    navItemImgAlt = $(this.$li[i]).find('img').attr('alt')
    if (this.POS === (i + 1)) {
      $navItem = $(`<div class="nav-item-img current" data-POS="${i + 1}"><img src="${navItemImgSrc}" alt="${navItemImgAlt}"></div>`)
    } else {
      $navItem = $(`<div class="nav-item-img" data-POS="${i + 1}"><img src="${navItemImgSrc}" alt="${navItemImgAlt}"></div>`)
    }
    $navItem.append($navItemImg)
    $nav.append($navItem)
  }

  /* ドットナビゲーションのクリックイベント */
  $(`${this.ID} .nav-item-img`).on('click', (event) => {
    clearInterval(this.autoSlideID)
    const $item = $(event.target)
    this.POS = Number($($item).attr('data-pos'))
    console.log(this.POS)
    this.moveUl()
    this.setAutoSlide()
  })
}

/**
 * タイプ1
 * 画面サイズ変更時のカルーセルのサイズ再設定
 */
MySlider.prototype.resizeUl = function () {
  const $frame = $(`${this.ID} > .rotation-slider-frame`)
  const frameWidth = $($frame).outerWidth()
  const width = frameWidth * $(this.liId).length
  const xpoint = -(frameWidth * 1)
  this.$ul.css({
    width: `${width}px`,
    transition: 'none',
    transform: `translateX(${xpoint}px)`
  })
  $(this.liId).css({
    width: `${frameWidth}px`
  })
  this.moveUl()
  this.setTransion()
}

/**
 * タイプ2
 * 画面サイズ変更時のカルーセルのサイズ再設定
 */
MySlider.prototype.resizeUlverSeccond = function () {
  const $frame = $(`${this.ID} > .rotation-slider-frame`)
  const frameWidth = $($frame).outerWidth()
  const width = frameWidth * $(this.liId).length
  const xpoint = -(((frameWidth / 2) * this.POS)) + (frameWidth / 4)
  this.$ul.css({
    width: `${width}px`,
    transition: 'none',
    transform: `translateX(${xpoint}px)`
  })
  $(this.liId).css({
    width: `${frameWidth / 2}px`
  })
  this.moveUl()
  this.setTransion()
}

/**
 * カルーセルコンポーネント初期化
 * @param {*カルーセル設定} config
 */
MySlider.prototype.Initialie = function (config) {
  /* 初期設定 */
  /* カルーセルタイプ設定 */
  this.config.type = (config.type) ? config.type : 1
  /* フルサイズ設定 */
  this.config.full = (config.full) ? config.full : false
  /* スライドスピード */
  this.config.speed = (config.speed) ? config.speed : 300
  /* 自動スライド */
  if (config.auto_slide === true) {
    this.config.interval = (config.interval) ? config.interval : 5000
    this.setAutoSlide()
  }
  /* 初期ポジション */
  if (config.start_posittion) {
    this.POS = config.start_posittion
  } else if (config.start_posittion > this.$li.length) {
    this.POS = 1
  } else {
    this.POS = 1
  }

  /* カルーセル初期化 */
  switch (this.config.type) {
    case 1:
      this.InitializeUl()
      break
    case 2:
      this.InitializeUlVerSeccond()
      break
    default:
      this.InitializeUl()
      break
  }

  /* サイドボタン生成 */
  if (config.full !== true) {
    if (config.next_button && config.back_button) {
      if (config.side_button === true) {
        this.InitializeSideButton()
      } else {
        this.InitializeOriginalSideButton(config.next_button, config.back_button)
      }
    } else {
      if (config.side_button === true) {
        this.InitializeSideButton()
      }
    }
  }

  /* ドットナビゲーションの生成 */
  if (config.navi === true) {
    this.config.navi = 'dot'
    this.InitializeNavi()
  }

  if (config.navi_img === true) {
    this.config.navi = 'img'
    this.InitializeNaviImg()
  }

  /* ウィンドウリサイズ時のカルーセルサイズ修正 */
  $(window).resize(() => {
    switch (this.config.type) {
      case 1:
        this.resizeUl()
        break
      case 2:
        this.resizeUlverSeccond()
        break
      default:
        this.resizeUl()
        break
    }
  })
}
