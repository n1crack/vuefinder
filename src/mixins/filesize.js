// define a mixin object
export default {
    methods: {
        fileSizeIEC (a, b, c, d, e) {
            return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(0) + ' ' + (e ? 'KMGTPEZY'[--e] + 'iB' : 'B');
        },
    }
};
