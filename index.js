// import vara from './vara.js';
// console.log(vara);

//数据
const bootstyle = ['','table-striped' ,  'table-bordered' ,'table-hover' ,'table-condensed'];// ,'table-responsive'
const elementBootData = {
    tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小1虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小3虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小2虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小sd虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: 'sa王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
    ]
}
const semanticData = {
    Jsondata:[
        {
            content:['狗有许多品种，每个品种都有不同的大小及性格，饲主通常选择适合自己生活方式的品种当作自已的伙伴，其中最受欢迎的品种绝对是吉娃娃。'],
            title: ' What is a dog?',
        },
        {
            content:[' 狗算是一种家畜。以其忠诚与忠心广受人类欢迎, 可以在世界各地的许多家庭里发现这个受欢迎的客人。'],
            title:  ' What kinds of dogs are there?',
        },
        {
            content:[
                '通常有三种方式可以取得一只狗狗，宠物店、私人饲主或是动物之家。 (请以领养代替购买)',
                '通常有三种方式可以取得一只狗狗，宠物店、私人饲主或是动物之家。 (请以领养代替购买)'
            ],
            title: ' How do you acquire a dog?'
        }]
}


//组件
var Home = Vue.extend({
    template: '<div><h1>Home</h1><p>{{msg}}</p></div>',
    data: function() {
        return {
            msg: 'Hello, vue router!'
        }
    }
})

var bootstrap = Vue.extend({
    template:'#bootstrap',
    data:function(){
        return {
            controlColor:true,
            classObject:{
            // 'active': true,
                'table-hover': false,
                'table-striped':false , 
                'table-bordered':false ,
                'table-hover':false ,
                'table-condensed':false
            },
            thClass: ['success','info','warning','danger'],
            PorpsData:elementBootData['tableData']
        }
    },
    computed:{
        comthClass:function(){
            return this.thClass[Math.floor(Math.random()*4)]
        }
    },
    methods:{
        // changethClass:function(){

        // },
        selectStyle:function(){
            var index = $('select.form-control')[0].selectedIndex;
            var selectedOne = bootstyle[index];
            for(x in this.classObject){
                this.classObject[x] = false;
            }
            this.classObject[selectedOne] = true;
            console.log(this.classObject);
            // console.log(index);
        }
    }
    // components:['PorpsData']
})

var elementBoot = Vue.extend({
    template:"#element-boot",
    data:function(){
        return elementBootData;
    }
})

var semantic = Vue.extend({
    template:"#semantic",
    // beforeEnter: (to, from, next) => {
    //     console.log('beforeEnter');
    // },
    data:function(){
        return{
            invert:true,
            PorpsData:semanticData['Jsondata']
        }
    },
    mounted:function(){
        $('.ui.accordion').accordion(); 
        $('.ui.checkbox').checkbox();
        console.log(this.PorpsData);
    }
})

const sansa = {template: '<div>Sansa</div>'}
const User = {template: '<div>User {{$route.params ||$route.params }}</div>'}
const User1 = {
    template :'<div>  &nbsq; parent Component </div>'
    ,watch:{
        '$route' (to, from) {
            console.log(to);
            console.log(from);
            // console.log($route.query);
        }
    }
}

const subHome = {template:'<div>this is subHome <router-view></router-view> this is subHome</div>'}

const UserProfile = {template:'<div>wo zai limian  {{$route.params.id}}</div>'}
const UserPosts = {template:'<div>wo zai limian  {{$route.params.id}}</div>'}

const Bar = {template:'#Bar'}
const Baz = {template:'<div>命名视图 1.2 {{$route.params.id}}</div>' }
const Foo = {template:'<div>命名视图 1 {{$route.params.id}}</div>' }





const routes = [
    { path: '/', components: 
        {
            default: Foo,
            a: Bar,
            b: Baz
        }
    },
    {
        path:'/home/child/semantic',
        component:semantic
    },
    { path: '/bootstrap', component: bootstrap  },
    { path: '/home/:id', component: subHome ,
        children:[
            {
                path:'profile',
                component : UserProfile
            },{
                path: 'post',
                component: UserPosts
            } 
        ]
    },
    {
        path: 'posts',
        component: UserPosts
    },
    { path: '/element-boot', component: elementBoot },
    { path: '/sansa', component: User},
    { path: '/sansa/:id', component: User1 }
    // { path: '/sansa/:sss', component: User },
]

var router = new VueRouter({routes})
const data = {
    forBootstrap:elementBootData,
    test:121
}

const app = new Vue({    
    router,
    data,
    computed:{
        breadcrumbVal:function(){
            return this.$route.fullPath
        },
        breadTimes:function(){
            return this.breadcrumbVal.split('/').slice(1)
        }
    }    
}).$mount('#app');
