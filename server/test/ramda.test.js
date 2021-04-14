import {forEach} from "ramda";

const map = new Map()

map.set({
    target: 'target',
    method: 'get',
    path: '/aas'
},function aaaaaaa(){
    console.log('aaaaaaa')
})

map.set({
    target: 'target1',
    method: 'get',
    path: '/aas'
},function bbbbbbbb(){
    console.log('bbbbbbbb')
})

map.set({
    target: 'target2',
    method: 'get',
    path: '/aas'
},function ccccccccc(){
    console.log('ccccccccc')
})

forEach(key => {
    console.log(key)
})(map)
