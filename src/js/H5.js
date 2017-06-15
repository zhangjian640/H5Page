var H5 = function () {
    this.id = ('h5_' +Math.random()).replace('.', '');
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    this.page = [];
    $('body').append(this.el);

    /**
     * 新增一个页
     * @param name 组件名词
     * @param text 页内的默认文本
     * @returns {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function (name, text) {
        var page = $('<div class="h5_page section">');
        if (name !== undefined) {
            page.addClass('h5_page_' + name)
        }
        if (text !== undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    };

    /**
     *
     * @param name
     * @param cfg
     * @returns {H5}
     */
    this.addComponent = function (name, cfg) {
        var cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        },cfg);
        var component;
        var page = this.page.slice(-1)[0];
        switch (cfg.type) {
            case 'base' :
                component = new H5ComponentBase(name,cfg);
            break;

        }
        page.append(component);
        return this;
    };


    // H5对象初始化
    this.loader = function () {
        this.el.fullpage({
            onLeave: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
    };
    return this;
};