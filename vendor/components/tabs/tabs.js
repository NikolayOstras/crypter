export default class Tabs {
    constructor(selector, options) {
        let defaultOptions = {
            isChanged: () => { }
        }
        this.options = Object.assign(defaultOptions, options)
        this.selector = selector
        this.tabs = document.querySelector(`[data-tabs="${selector}"]`) //select elements with attribute 
        if (this.tabs) {
            this.tabList = this.tabs.querySelector('.tabs__nav') //get list of buttons
            this.tabButtons = this.tabList.querySelectorAll('.tabs__nav-btn') // get buttons
            this.tabPanels = this.tabs.querySelectorAll('.tabs__panel') // get tab panels

        } else {
            console.error(`Selector ${selector} not exist`)
            return
        }
        this.check()
        this.init()
        this.events()
    }
    check() {
        if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
            console.error('Количество элементов с одинаковым data-tabs больше одного!');
            return;
        }

        if (this.tabButtons.length !== this.tabPanels.length) {
            console.error('Количество кнопок и элементов табов не совпадает!');
            return;
        }
    }
    init() {
        // add attributes for screen reader
        this.tabList.setAttribute('role', 'tablist')
        this.tabButtons.forEach((el, i) => {
            el.setAttribute('role', 'tab')
            el.setAttribute('tabindex', '-1')
            el.setAttribute('id', `${this.selector}${i + 1}`)
            el.classList.remove('tabs__nav-btn--active')
        })
        this.tabPanels.forEach((el, i) => {
            el.setAttribute('role', 'tabpanel')
            el.setAttribute('tabindex', '-1')
            el.setAttribute('aria-labelledby', this.tabButtons[i].id)
            el.classList.remove('tabs__panel--active')
        })
        this.tabButtons[0].classList.add('tabs__nav-btn--active') // activate first panel and button
        this.tabButtons[0].removeAttribute('tabindex')
        this.tabButtons[0].setAttribute('aria-selected', 'true')
        this.tabPanels[0].classList.add('tabs__panel--active')

    }
    events() {
        this.tabButtons.forEach((el, i) => {
            // switch on mouse click
            el.addEventListener('click', (e) => {
                let currentTab = this.tabList.querySelector('[aria-selected')
                if (e.currentTarget !== currentTab) {
                    this.switchTabs(e.currentTarget, currentTab)
                }
            })
            // switch on key <- or ->
            el.addEventListener('keydown', (e) => {
                //let index = Array.prototype.indexOf.call(this.tabButtons, e.currentTarget)
                let index = i
                console.log(index, i)
                let dir = null;
                if (e.which === 37) {
                    dir = index - 1

                } else if (e.which === 39) {
                    dir = index + 1;
                } else if (e.which === 40) {
                    dir = 'down'
                } else {
                    dir = null
                }
                //console.log(dir)
                if (dir !== null) {
                    if (dir === 'down') {
                        this.tabPanels[i].focus()
                    } else if (this.tabButtons[dir]) {
                        this.switchTabs(this.tabButtons[dir], e.currentTarget)
                    }
                }
            })
        })
    }
    // change classes and atributes to needed tab panel and button
    switchTabs(newTab, oldTab) {
        newTab.focus()
        newTab.removeAttribute('tabindex')
        newTab.setAttribute('aria-selected', 'true')
        oldTab.removeAttribute('aria-selected')
        oldTab.setAttribute('tabindex', '-1')
        let index = Array.prototype.indexOf.call(this.tabButtons, newTab)
        //console.log(index)
        let oldIndex = Array.prototype.indexOf.call(this.tabButtons, oldTab)
        this.tabPanels[oldIndex].classList.remove('tabs__panel--active')
        this.tabPanels[index].classList.add('tabs__panel--active')
        this.tabButtons[oldIndex].classList.remove('tabs__nav-btn--active')
        this.tabButtons[index].classList.add('tabs__nav-btn--active')
        this.options.isChanged(this)
    }
}