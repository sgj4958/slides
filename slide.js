    const slideCustom = (slideItemArray, insertElementId, option) => {
        
        const optionDefault = {
            autoSlide: true,
            autoSlideTime: 2000,
            showNavigation: true,
            infiniteSlide: true,
            arrowDisplay: true,
            showPlayStop: true,
            width: 450,
            height: 250,
            imageFullWidth: true
        }
        option = {
            ...optionDefault,
            ...option
        }

        const slideCustomId = `slideCustomId_No${Math.floor(Math.random() * 10e5)}`
        document.querySelector(`#${insertElementId}`).insertAdjacentHTML("afterbegin", `
        <div id="${slideCustomId}">
            <ul data-id="slideWrap" style="left: 0;">
            ${slideItemArray.map(item => `<li class="slide"><img src="${item}" title="slide image"></li>`).join("")}
            </ul>
            <i data-id="left" class="arrow">
                <span class="material-symbols-outlined">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                    </svg>
                </span>
            </i>
            <i data-id="right" class="arrow">
                <span class="material-symbols-outlined">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                    </svg>
                </span>
            </i>

            <ul data-id="navigation"></ul>

            <div class="playAndStop">
                <i data-id="stop">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                </i>
                <i data-id="play">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                </i>
            </div>
        </div>
        `)

        document.head.insertAdjacentHTML("beforeend", `<style>
        #${slideCustomId}, #${slideCustomId} * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        #${slideCustomId} {
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            cursor: grab;
        }
        #${slideCustomId} [data-id="slideWrap"] {
            width: ${option.width}px;
            height: ${option.height}px;

            list-style: none;
            position: relative;
            transition: .5s;
            display: flex;
        }
        #${slideCustomId} [data-id="slideWrap"].disableTransition {transition: none !important;}
        #${slideCustomId} [data-id="slideWrap"] .slide {
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
        }
        #${slideCustomId} [data-id="slideWrap"] .slide img {
            ${option.imageFullWidth ? "width: 100%;" : "height: 100%;"}
        }
        #${slideCustomId} .arrow {
            position: absolute;
            z-index: 1;
            cursor: pointer;
            color: #fff;
            ${option.arrowDisplay ? "" : "display: none;"}
        }
        #${slideCustomId} [data-id="left"] {left: 5px;}
        #${slideCustomId} [data-id="right"] {right: 5px;}
        #${slideCustomId} .arrow.hide {display: none;}
        #${slideCustomId} [data-id="navigation"] {
            list-style: none;
            position: absolute;
            bottom: 10px;
            width: 100%;
            height: 7px;
            padding: 0 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        #${slideCustomId} [data-id="navigation"] li {
            width: 100%;
            height: 100%;
            border: 1px solid #fff;
            border-radius: 5px;
            opacity: .7;
            overflow: hidden;
            cursor: pointer;
        }
        #${slideCustomId} [data-id="navigation"] li.active {background: #fff;}
        #${slideCustomId} [data-id="slideWrap"].grabbing {cursor: grabbing;}
        #${slideCustomId} .playAndStop {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            left: 50%;
            translate: -50% 0;
            ${option.showPlayStop ? "" : "display: none;"}
        }
        #${slideCustomId} .playAndStop i.hide {display: none;}
    </style>`)
    
    const slider = document.querySelector(`#${slideCustomId}`)
    const slideWrap = slider.querySelector(`[data-id="slideWrap"]`)
    const navigation = slider.querySelector(`[data-id="navigation"]`)
    const getNowLeft = () => parseInt(getComputedStyle(slideWrap).left)
    const setLeft = left => slideWrap.style.left = left + "px"
    const slideWidth = parseInt(getComputedStyle(slideWrap.querySelector(`.slide`)).width)
    const transitionEnable = (type) => slideWrap.classList[type ? "remove" : "add"]("disableTransition")

    const autoSlide = option.autoSlide
    const autoSlideTime = option.autoSlideTime
    const autoSlideFunction = () => slider.querySelector(`.arrow[data-id="right"]`).click()
    let autoSlideInterval
    const setAutoSlide = (type = true) => {
        if(!autoSlide) return
        else if(type && !autoSlideInterval) autoSlideInterval = setInterval(autoSlideFunction, autoSlideTime)
        else if(!type) {
            clearInterval(autoSlideInterval)
            autoSlideInterval = null
        }
    }
    setAutoSlide(true)

    const showNavigation = option.showNavigation
    if(showNavigation)
    slideWrap.querySelectorAll(`.slide`).forEach(element => {
        const li = document.createElement("li")
        li.addEventListener("click", () => {
            setAutoSlide(false)
            transitionEnable(true)
            setLeft(-element.offsetLeft)
            setAutoSlide(true)
        })
        navigation.insertAdjacentElement("beforeend", li)
    })
    const setNavigationActive = () => {
        if(!showNavigation) return
        const _index = Math.abs(getNowLeft() / slideWidth) - (infiniteSlide ? 1 : 0)
        navigation.querySelectorAll(`li`).forEach((element, index) => 
        element.classList[index == _index ? "add" : "remove"]("active"))
    }

    const infiniteSlide = option.infiniteSlide
    if(infiniteSlide) {
        const firstSlide = slideWrap.querySelector(`.slide`).cloneNode(true)
        const lastSlide = slideWrap.querySelector(`.slide:last-child`).cloneNode(true)
        slideWrap.insertAdjacentElement("beforeend", firstSlide)
        slideWrap.insertAdjacentElement("afterbegin", lastSlide)
        setLeft(-slideWidth)
    }

    const slideLength = slideWrap.querySelectorAll(`.slide`).length
    const maxSlideWidth = -slideWidth * (slideLength - 1)
    const minSlideWidth = 0
    
    const setArrowDisplay = () => {
        if(infiniteSlide) return

        const nowLeft = getNowLeft()
        slider.querySelectorAll(`.arrow`).forEach(element => element.classList.remove("hide"))
        if(nowLeft == maxSlideWidth) slider.querySelector(`.arrow[data-id="right"]`).classList.add("hide")
        if(nowLeft == minSlideWidth) slider.querySelector(`.arrow[data-id="left"]`).classList.add("hide")
    }

    setArrowDisplay()

    const slideMove = (left = false, nowLeftValue) => {
        const nowLeft = nowLeftValue || getNowLeft()
        const nowLeftCorrection = Math.round(nowLeft / slideWidth) * slideWidth

        setLeft(nowLeftCorrection + parseInt(`${left ? `-` : `+`}${slideWidth}`))
        if(left && nowLeft <= maxSlideWidth) setLeft(maxSlideWidth) // 오른쪽 끝
        else if(!left && nowLeft >= minSlideWidth) setLeft(minSlideWidth) // 왼쪽 끝
    }

    let isNowMoving = false
    slider.querySelectorAll(`.arrow`).forEach(element => {
        element.addEventListener("click", () => {
            if(isNowMoving) return
            isNowMoving = true
            transitionEnable(true)
            slideMove(element.dataset.id == "right")
        })
        
        slideWrap.addEventListener("transitionend", () => {
            if(infiniteSlide) {
                const nowLeft = getNowLeft()
                const normalFirstSlideLeft = minSlideWidth - slideWidth
                const normalLastSlideLeft = maxSlideWidth + slideWidth
                transitionEnable(false)
                if(nowLeft == maxSlideWidth) setLeft(normalFirstSlideLeft)
                else if(nowLeft == minSlideWidth) setLeft(normalLastSlideLeft)
            }

            setNavigationActive()
            setArrowDisplay()
            isNowMoving = false
        })
    })

    slideWrap.addEventListener("mousedown", (e) => {
        e.preventDefault()
        const nowLeft = getNowLeft()
        slider.classList.add("grabbing")
        transitionEnable(false)
        setAutoSlide(false)

        const mouseMoveEvent = event => setLeft(nowLeft - (e.x - event.x))
        document.addEventListener("mousemove", mouseMoveEvent);

        document.addEventListener("mouseup", (event) => {
            transitionEnable(true)
            const mouseMoveValueCorrection = 100
            const mouseMoveValue = e.x - event.x

            setLeft(nowLeft)
            if(Math.abs(mouseMoveValue) > mouseMoveValueCorrection) slideMove(mouseMoveValue > 0, nowLeft)

            setAutoSlide(true)
            
            slider.classList.remove("grabbing")

            document.removeEventListener("mousemove", mouseMoveEvent)
        })
    })

    slider.querySelector(`[data-id="${autoSlide ? "play" : "stop"}"]`).classList.add("hide")
    slider.querySelector(`.playAndStop`).addEventListener("click", () => {
        setAutoSlide(!autoSlideInterval)
        slider.querySelectorAll(`.playAndStop i`).forEach(element => element.classList.toggle("hide"))
    })

    }