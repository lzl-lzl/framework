function delayGetInfo(){
    setTimeout(function() {
        getTaoBaoInfo();
        // loadVue();
        // forPromise().then(loadVue());
    }, 100);
}

function _object(list,values){
    var result={};
    for(var i=0;i<list.length;i++){
         if(values){
              result[list[i]]=values[i];
         }else{
              result[list[i][0]]=list[i][1];
         }
    }
    return result;  
}  

function ArrayToObject(ele){
    var result = {};
    result.value = ele[1];
    result.label = ele[0];    
    // result.label = ele[0].split(' ')[1];    
    return result;
}

var Jsondata ='66';
function forPromise(result){
    return new Promise(function(res,rej){
        Jsondata = result;
        res('Hello Pro')
    })
}
function cb(result) {  
    //alert(result);  
 
        // for(var i in result) {  
        //     console.log(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        // }  
        console.log(Jsondata['result'])
        // Jsondata = result;
        forPromise(result).then(loadVue());
}  
function getTaoBaoInfo(val){
    // var cb = jsonpCallback
    var actualVal = val || '洗衣粉';
    var jsonp=document.createElement("script");  
    jsonp.type="text/javascript";
    jsonp.src="http://suggest.taobao.com/sug?code=utf-8&q="+actualVal+"&callback=cb";
    // 音乐 http://v5.pc.duomi.com/search-ajaxsearch-searchall?kw=%E6%9E%97%E4%BF%8A%E6%9D%B0&pi=1&pz=12
    // http://www.bejson.com/knownjson/webInterface/
    document.getElementsByTagName("head")[0].appendChild(jsonp);
}

function ajaxCallback(result){
    console.log(vmApp2);
    console.log('result'+result);    
    Jsondata = result;
    JsondataVal = Jsondata['result'].map(ArrayToObject);
    vmApp2.options[0].children = JsondataVal;
    // vmApp2.changedVal = JsondataVal[]
}
function $jsonp(val){
    var actualVal = val || '洗衣粉';
    $.ajax({
        url:"http://suggest.taobao.com/sug?code=utf-8&q="+actualVal+"&callback=ajaxCallback",  
        dataType:'jsonp',  
        // data:'',  
        jsonp:'cb',  
        success:function(result) {  
            console.log('success'+result);//???没用
        },  
        timeout:3000  
    })
}

function loadVue(){
        window.vmApp2 = new Vue({
        data(){
            // return Jsondata
            // return {};
            return {
                valueOfLabel:200,
                showValue:'根据右边变化',
                options : [{
                    value:'zhinan',
                    label:'kongs',
                    children:Jsondata['result'].map(ArrayToObject)
                    //   children:[{
                    //     value: 'yizhi',
                    //     label: '一致'
                    //   }]
                }], 
                selectedOptions: [],
                selectedOptions2: [],
                //以上是连级选择器的

                restaurants: [],
                state1: '洗衣粉',
                state2: '洗衣',
                //一下是loading页
                fullscreenLoading: false
            }
        },
        // computed:{
        //     asd:function(){
        //         this.$nextTick( () => { 
        //             return [...this.$refs.casca.currentLabels];
        //         })
               
        //     }
        // },
        watch:{
            state1:function(newV,oldV){
                this.options[0].label = this.state1;
                $jsonp(newV);
                this.showValue = '根据左右变化';
                // console.log('s2'+this.state2);
            }
        },
        mounted:function(){
            this.openFullScreen();
            console.log(Jsondata['result']);
            this.restaurants = this.loadAll();
            // console.log(this.options[0].label)
            this.options[0].label = this.state1;
           
        },
        methods:{
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.fullscreenLoading = false;
                }, 500);
            },
            //以上是loading页面
            handleChange(value) {
                // this.showValue = value[1];
                this.showValue = this.$refs.casca.currentLabels[1].split(' ')[0];
                this.valueOfLabel = value[1];
                console.log('this.showValue'+ this.showValue);
                 console.log('value' + value );
            },   

            //以上的联级选择器的
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
              },
              createFilter(queryString) {
                return (restaurant) => {
                  return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
              },
              loadAll() {
                var valPlusadd = [
                  { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                  { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                  { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                  { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                  { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                  { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                  { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                  { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                  { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                  { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                  { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                  { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                  { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                  { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                  { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                  { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                  { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                  { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                  { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                  { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                  { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                  { "value": "钱记", "address": "上海市长宁区天山西路" },
                  { "value": "壹杯加", "address": "上海市长宁区通协路" },
                  { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                  { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                  { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                  { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                  { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                  { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                  { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                  { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                  { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                  { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                  { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                  { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                  { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                  { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                  { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                  { "value": "浏阳蒸菜", "address": "天山西路430号" },
                  { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                  { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                  { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                  { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                  { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                  { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                  { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                  { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                  { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                ];
                var returnedVal = valPlusadd.filter(function(ele){
                    return ele.value.indexOf('（')<=-1&&ele.value.indexOf('(')<=-1;
                });
                return returnedVal;
              },
              handleSelect(item) {
                console.log(item);
              }
            
        }
    }).$mount("#app2")
}
