(function () {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = Object.assign(Preload.DEFAULTS, options);
        if('order' === this.opts.order) {
            this._order();
        } else {
            this._unoredered();
        }
    }

    Preload.DEFAULTS = {
        order: 'unoredered',
        each: null, // 每一张图片加载
        all: null // 所有图片加载
    };

    Preload.prototype._order = function() {
        let imgs = this.imgs;
        let opts = this.opts;
        let count = 0;

        function preloadImg() {
            let img = new Image();
            img.onload = function () {
                opts.each && opts.each(count);
                count++;
                preloadImg();
            }

            img.onerror = function () {
                opts.each && opts.each(count);
                count++;
                preloadImg();
            }

            if (count >= lens) {
                opts.all && opts.all();
                return;
            }
            img.src = imgs[count];

        }

        preloadImg();
    }

    Preload.prototype._unoredered = function () {
        const imgs = this.imgs,
            opts = this.opts;

        let len = imgs.length;
        let count = 0;
        for (let i = 0; i < len; i++) {
            if (typeof imgs[i] !== 'string') return;

            let img = new Image();

            img.onload = function () {
                count++;
                opts.each && opts.each(count);

                if (count === len - 1) {
                    opts.all && opts.all();
                }

            }

            img.onerror = function () {
                count++;
                opts.each && opts.each(count);
                if (count === len - 1) {
                    opts.all && opts.all();
                }
            }

            img.src = imgs[i];

        }
    }

    window.Preload = Preload;
})();