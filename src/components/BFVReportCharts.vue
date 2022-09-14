<template>
  <v-container id="reportCard" fluid v-if="!!playerData">
    <v-row justify="center">
      <v-col cols="12">

        <v-card elevation="5" :img="(!!backgroundImg)? backgroundImg: '../static/bg-1.jpg'">
<!--          <v-img src="../static/bg3.jpg">-->

          <v-container fluid>
            <v-row justify="space-around">

              <v-col cols="12">
                <h1 style="text-align: center;">{{playerData.userName}} 生涯总览</h1>
              </v-col>

              <v-col cols="10">
                <v-card :color="cardColor" class="mb-8">

                  <v-card-title class="mt-8">
                    <v-avatar size="64">
                      <img
                        id="originAvatar"
                        alt="user"
                        :src="(!!playerData._avatarData)? playerData._avatarData: playerData._avatar"
                      />
<!--                      :src="(!!playerData._avatarData)? playerData._avatarData: playerData.avatar"-->
                    </v-avatar>
                    <p class="ml-3 font-weight-black">
                      {{playerData.userName}}
                      <br/>
                      {{playerData.rank}}级
                      <br/>
                    </p>
                    <v-spacer/>
                    <p>
                      <span class="font-italic text-caption">
                        {{moment(new Date()).format('yyyy-MM-DD HH:mm:ss')}}
                      </span>
                      <br/>
                      o.{{playerData.id}}
                    </p>
                  </v-card-title>

                  <v-card-subtitle>
                    <v-row dense>
                      <v-col cols="12" v-if="!!bfBanData">
                        <span class="text-overline font-weight-black">Bfban </span>
                        <v-menu
                          open-on-hover
                          bottom
                          offset-y
                          @input="bfBanReportRecord">
                          <template v-slot:activator="{ on, attrs }">
<!--                            <v-chip v-bind="attrs" v-on="on" :href="bfBanData.url" ripple small dark color="red">-->
                            <v-chip v-bind="attrs" v-on="on" ripple small dark color="red">
                              {{bfBanStatusMapping[bfBanData.status]}}
                            </v-chip>
                          </template>

                          <v-card tile width="500px">
                            <v-card-title>
                              <a :href="bfBanData.url" class="text-decoration-none">举报记录</a>
                            </v-card-title>
                            <v-card-text v-for="data in bfBanReportContent" :key="data.createDatetime">
                              <a :href="'https://bflove.gay/#/account/'+((!!data.uId)? data.uId: data.fooUId)" class="text-decoration-none">{{(!!data.username)? data.username: data.foo}}</a>
                              <br/>
                              <span class="font-italic">{{moment(data.createDatetime).format('yyyy-MM-DD hh:mm:ss')}} ：</span>
                              <br/>
                              <span v-html="bfBanReportRecordFormat(data)"></span>

                              <v-divider class="mt-2"/>
                            </v-card-text>
                          </v-card>
                        </v-menu>

                        <span v-if="!!bfBanData.cheatMethods">
                          <v-chip ripple small dark color="orange" v-for="key in bfBanData.cheatMethods.split(',')" :key="key">
                          {{bfBanCheatMethodMapping[key]}}
                        </v-chip>
                        </span>
                      </v-col>
<!--                      <v-col>-->
<!--                        Bfban <v-chip small dark color="red">认为石锤</v-chip>-->
<!--                      </v-col>-->
                    </v-row>

                    <v-row dense>
                      <v-col cols="12">
                        <span class="text-overline font-weight-black">Robot社区成就 </span>

                        <v-tooltip bottom v-for="achievement in robotCommunity.achievement" :key="achievement.type">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip v-if="!!(achievementData.achievement.achievements[achievement.type])"
                                    v-bind="attrs" v-on="on" ripple small dark
                                    :color="achievementData.achievementColor[achievementData.achievement.achievements[achievement.type].levelType]">
                              {{achievementData.achievement.achievements[achievement.type].name}}
<!--                              {{achievement.type}}-->
                            </v-chip>
                            <v-chip v-else v-bind="attrs" v-on="on" ripple small dark color="black">
                              {{achievement.type}}
                            </v-chip>
                          </template>
                          <span>
                            <span v-if="!!(achievementData.achievement.achievements[achievement.type])">
                              {{achievementData.achievement.achievements[achievement.type].level}}<br/>
                            </span>
                            {{achievement.date}}<br/>
                          </span>
                        </v-tooltip>

                      </v-col>
                    </v-row>
                  </v-card-subtitle>

                  <v-divider/>

                  <v-row no-gutters class="mt-8">
                    <v-col cols="6" class="text-overline font-weight-bold">
                      <h3>
                        <v-row no-gutters justify="center">
                          <v-col cols="4">击杀：</v-col>
                          <v-col cols="5">{{playerData.kills}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">死亡：</v-col>
                          <v-col cols="5">{{playerData.deaths}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">K/D：</v-col>
                          <v-col cols="5">{{playerData.killDeath}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">SPM：</v-col>
                          <v-col cols="5">{{playerData.scorePerMinute}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">KPM：</v-col>
                          <v-col cols="5">{{playerData.killsPerMinute}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">游戏时长(小时)：</v-col>
                          <v-col cols="5">{{Math.floor(playerData.secondsPlayed / 3600)}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">总命中率：</v-col>
                          <v-col cols="5">{{playerData.accuracy}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">总爆头率：</v-col>
                          <v-col cols="5">{{playerData.headshots}}</v-col>
                        </v-row>

                      </h3>
                    </v-col>

                    <v-col cols="6" class="text-overline font-weight-bold">
                      <h3>
                        <v-row no-gutters justify="center">
                          <v-col cols="4">击杀助攻：</v-col>
                          <v-col cols="5">{{playerData.killAssists}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">最佳兵种：</v-col>
                          <v-col cols="5">{{playerData.bestClass}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">最高连杀：</v-col>
                          <v-col cols="5">{{playerData.highestKillStreak}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">倒地救援：</v-col>
                          <v-col cols="5">{{playerData.revives}}</v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                          <v-col cols="4">治疗次数：</v-col>
                          <v-col cols="5">{{playerData.heals}}</v-col>
                        </v-row>

                      </h3>
                    </v-col>

                  </v-row>

                  <br/>
                  <v-divider/>
                  <br/>

                  <v-row no-gutters>
                    <v-col cols="6">
                      <div id="charts_winPercent" style="height: 400px"/>
                    </v-col>

                    <v-col cols="6">
                      <div id="charts_careerRadar" style="height: 400px"/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <div id="charts_topKilledWithAllMethods" style="height: 600px"/>
                    </v-col>
                  </v-row>

                  <v-row justify="center">
                    <v-col cols="10">
                      <div id="charts_allKilledPie" style="height: 800px"/>
                    </v-col>
                  </v-row>

                  <v-row class="mt-16" justify="space-around">
                    <v-col cols="5">
                      <div id="charts_weaponKilledPie" style="height: 500px"/>
                    </v-col>

                    <v-divider vertical/>

                    <v-col cols="5">
                      <div id="charts_vehicleKilledPie" style="height: 500px"/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <div id="charts_robotMvpCount" style="height: 600px"/>
                    </v-col>
                  </v-row>

                </v-card>
              </v-col>

            </v-row>
          </v-container>

          <v-card-text v-if="!!screenshotsBlob">
            <v-btn v-if="!blobUrl" icon @click="generateDownload">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <a v-else id="download" :href="blobUrl" :download="$route.query.id + '.png'">下载</a>
          </v-card-text>

<!--          </v-img>-->

        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import chartsOption from "../charts/chartsOption";
import moment from 'moment'
import dataUtils from "../datautils";
import html2canvas from "html2canvas"
import achievementData from "../achievement";

export default {
  name: "BFVReportCharts",
  data(){
    return {
      bfBanData: undefined,
      playerData: undefined,
      screenshotsBlob: undefined,
      blobUrl: undefined,
      backgroundImg: undefined,
      achievementData: achievementData,
      robotCommunity: {
        mvp: [],
        achievement: []
      },
      bfBanCheatMethodMapping: {
        'aimbot': '自瞄',
        'wallhack': '透视',
        'gadgetModify': '改装备',
      },
      bfBanStatusMapping: {
        '0': '未处理',
        '1': '认为石锤',
        '2': '嫌疑再观察',
        '3': '认为没开挂',
        '4': '回收站',
        '5': '回复讨论中',
        '6': '等待管理确认',
      },
      cardColor: 'rgba(236,239,241,0.95)',
      bfBanReportContent: undefined
    }
  },
  methods: {
    moment,
    renderVehicleKilledPie(){
      let option = chartsOption.vehicleKilledPie;
      let myChart = this.$echarts.init(document.getElementById("charts_vehicleKilledPie"),null, {renderer: 'svg'});

      option.series[0].data = []

      this.playerData.vehicles.forEach((value) => {
        if(value.kills > 0){
          option.series[0].data.push(
            {
              name: value.vehicleName,
              value: value.kills,
              _originData: value
            }
          )
        }
      })

      option.series[0].data = dataUtils.bubbleSort(option.series[0].data, 'value')
      //取前10
      option.series[0].data.splice(10)

      myChart.setOption(option)
    },
    renderWeaponKilledPie(){
      let option = chartsOption.weaponKilledPie;
      let myChart = this.$echarts.init(document.getElementById("charts_weaponKilledPie"),null, {renderer: 'svg'});

      option.series[0].data = []

      this.playerData.weapons.forEach((value) => {
        if(value.kills > 0){
          option.series[0].data.push(
            {
              name: value.weaponName,
              value: value.kills,
              _originData: value
            }
          )
        }
      })

      option.series[0].data = dataUtils.bubbleSort(option.series[0].data, 'value')
      //取前10
      option.series[0].data.splice(10)

      myChart.setOption(option)
    },
    renderAllKilledPie(){
      let option = chartsOption.allKilledPie;
      let myChart = this.$echarts.init(document.getElementById("charts_allKilledPie"),null, {renderer: 'svg'});

      option.series[0].data = []

      let aaa = this.playerData.vehicles.concat(this.playerData.weapons)
      aaa.forEach((value) => {
        if(value.kills > 0){
          option.series[0].data.push(
            {
              name: (!!value.vehicleName)? value.vehicleName: value.weaponName,
              value: value.kills,
              _originData: value
            }
          )
        }
      })

      option.series[0].data = dataUtils.bubbleSort(option.series[0].data, 'value')
      //取前10
      option.series[0].data.splice(10)

      myChart.setOption(option)
    },
    renderTopKilledWithAllMethods(){
      let option = chartsOption.topKilledBarWithAllMethods;
      let myChart = this.$echarts.init(document.getElementById("charts_topKilledWithAllMethods"),null, {renderer: 'svg'});

      let topKilled = dataUtils.bubbleSort(dataUtils.getTopKilledWithAllMethods(this.playerData, 10))

      option.yAxis.data = []
      option.series[0].data = []

      topKilled.forEach((value) => {
        option.yAxis.data.push((!!value.vehicleName)? value.vehicleName: value.weaponName)
        option.series[0].data.push(value.kills)
      })

      myChart.setOption(option)
    },
    renderRobotCommunityMvpCount(){
      if(this.robotCommunity.mvp.length === 0) return

      let option = chartsOption.robotCommunityMvpCount
      let myChart = this.$echarts.init(document.getElementById("charts_robotMvpCount"),null, {renderer: 'svg'});

      let mvpCount = dataUtils.bubbleSort(this.robotCommunity.mvp, 'value')

      option.yAxis.data = []
      option.series[0].data = []

      mvpCount.forEach((value) => {
        option.yAxis.data.push(value.name)
        option.series[0].data.push(value.value)
      })

      myChart.setOption(option)
    },
    renderWinPercent(){
      let option = chartsOption.winPercent;
      let myChart = this.$echarts.init(document.getElementById("charts_winPercent"),null, {renderer: 'svg'});

      option.title.subtext = this.playerData.winPercent

      option.series[0].data[0].name = '胜场'
      option.series[0].data[0].value = this.playerData.wins

      option.series[0].data[1].name = '败场'
      option.series[0].data[1].value = this.playerData.loses

      myChart.setOption(option)
    },
    renderCareerRadar(){
      let option = chartsOption.careerRadar;
      let myChart = this.$echarts.init(document.getElementById("charts_careerRadar"),null, {renderer: 'svg'});

      let rankFactor = (this.playerData.rank - (this.playerData.rank % 10)) / 10
      rankFactor += 1
      let radarMax = rankFactor * 1000;

      let killTotal = dataUtils.careerKilledStatistic(this.playerData)

      option.radar[0].indicator[0].max = radarMax
      option.radar[0].indicator[1].max = radarMax
      option.radar[0].indicator[2].max = radarMax
      option.radar[0].indicator[3].max = radarMax
      option.radar[0].indicator[4].max = radarMax
      option.radar[0].indicator[5].max = radarMax

      option.series[0].data[0].value[0] = Math.min(killTotal.assault, radarMax)
      option.series[0].data[0].value[1] = Math.min(killTotal.medic, radarMax)
      option.series[0].data[0].value[2] = Math.min(killTotal.support, radarMax)
      option.series[0].data[0].value[3] = Math.min(killTotal.recon, radarMax)
      option.series[0].data[0].value[4] = Math.min(killTotal.plane, radarMax)
      option.series[0].data[0].value[5] = Math.min(killTotal.tank, radarMax)


      let nameMapping = {
        '突击兵': "assault",
        '医疗兵': "medic",
        '支援兵': "support",
        '侦察兵': "recon",
        '飞行员': "plane",
        '坦克长': "tank",
      }
      this.$gloval['careerKillTotalVal'] = {}
      for(let val of option.radar[0].indicator){
        this.$gloval['careerKillTotalVal'][val.name] = killTotal[nameMapping[val.name]]
      }

      myChart.setOption(option)
    },
    dataURLToBlob(dataurl) {
      //ie 图片转格式
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    generateDownload(){
      if(!this.blobUrl){
        this.blobUrl = URL.createObjectURL(this.screenshotsBlob);
      }
    },
    bfBanReportRecord(){
      if(!this.bfBanReportContent){
        this.bfBanReportContent = {}
        axios.get("https://bfban.gametools.network/api/cheaters/"+this.bfBanData.originUserId).then((res) => {
          let data = res.data.data
          this.bfBanReportContent = this.contentBubbleSort(data.reports.concat(data.verifies).concat(data.confirms).concat(data.replies))
        })
      }

    },
    bfBanReportRecordFormat(data){
      let a = ''
      let methodMapping = this.bfBanCheatMethodMapping

      if(!!data.description){
        a = data.description
      }else if(!!data.suggestion){

        if(!!data.cheatMethods){
          a += '作弊方式：'
          data.cheatMethods.split(',').forEach((meto) => {
            a += `<span class="font-weight-bold">${methodMapping[meto]}</span>`
          })

          a += `<br/><br/>`
        }

        a += `${data.suggestion}`
      }else if(!!data.userVerifyCheaterId){

        let verifyData = {}
        for(let content of this.bfBanReportContent){
          if(!!content.id && content.id === data.userVerifyCheaterId){
            verifyData = content
            break
          }
        }

        return `赞同了 <a href="https://bflove.gay/#/account/${verifyData.uId}" class="text-decoration-none">${verifyData.username}</a> 的决定`
      }else {
        a = data.content
      }

      return a
    },
    //升序  bfvreport 回复记录的时间戳判断
    contentBubbleSort(data){
      for (let i = 0; i < data.length; i++) {
        let isSort = true;

        for (let j = 0; j < (data.length - i); j++) {
          if(j !== (data.length - 1)){
            if(moment(data[j].createDatetime).valueOf() > moment(data[j + 1].createDatetime).valueOf()){
              let biggerTemp = data[j];
              data[j] = data[j + 1]
              data[j + 1] = biggerTemp

              isSort = false;
            }
          }
        }

        if(isSort) break
      }

      return data
    },
    getBlurImageBase64FromUrl(url, px, isProd){
      return new Promise((resolve) => {
        let image = new Image();

        image.onload = function(){
          if(isProd){
            let width = image.width;
            let height = image.height;

            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');
            ctx.filter = "blur("+px+"px)"
            ctx.drawImage(image, 0, 0);
            resolve(canvas.toDataURL('png'))
          }else{
            resolve(undefined)
          }
        }

        image.src = url;
      })
    }
  },
  mounted() {

    axios.get("https://api.gametools.network/bfv/all/?format_values=true&name="+this.$route.query.id+"&platform=pc&skip_battlelog=false&lang=zh-cn").then((res) => {

      //生产环境下头像改为nginx代理的地址
      if(res.data.avatar.indexOf("secure.gravatar.com") !== -1){
        res.data._avatar = "../static/d_avatar.jpg"
      } else if(dataUtils.isProdEnv()){
        res.data._avatar = res.data.avatar.replace("https://secure.download.dm.origin.com/", "../originproxy/")
      }else{
        res.data._avatar = res.data.avatar.replace("https://secure.download.dm.origin.com/", "http://bfvreport.harryz.top/originproxy/")
      }

      let enableAvatarBlur = !!this.$route.query.avatarBlur && this.$route.query.avatarBlur === 'true';
      this.getBlurImageBase64FromUrl(res.data._avatar, enableAvatarBlur? 16: 0, dataUtils.isProdEnv()).then((base64) => {
        this.playerData = res.data
        this.playerData._avatarData = base64
      }).then(axios.get("https://api.zth.ink/api/getCommunityStatus?pid="+res.data.id).then((robotRes) => {
          //请求机器人社区数据
          let comRes = robotRes.data
          if(comRes.status === 1){
            this.robotCommunity.mvp = comRes.data.mvp
            this.robotCommunity.achievement = comRes.data.title
          }
        })).finally(() => {

        this.$nextTick(() => {
          this.renderWinPercent()
          this.renderCareerRadar()
          this.renderTopKilledWithAllMethods()
          this.renderAllKilledPie()
          this.renderWeaponKilledPie()
          this.renderVehicleKilledPie()

          this.renderRobotCommunityMvpCount()

          //随机背景
          if(!!this.$route.query.background && this.$route.query.background === 'true'){
            this.backgroundImg = "../static/bg" + (Math.abs(Math.round(Math.random() * 10) - 5)) + ".jpg"
          }

          setTimeout(() => {
            html2canvas(document.getElementById("reportCard")).then((canvas) => {
              this.screenshotsBlob = this.dataURLToBlob(canvas.toDataURL('image/png'));

              if(!!this.$route.query.autoGenerate && this.$route.query.autoGenerate === 'true'){
                this.generateDownload()
              }
            })
          }, 5000)

        })

        axios.get("https://api.gametools.network/bfban/checkban?names="+this.playerData.userName).then((res) => {
          let lowerName = this.playerData.userName.toLowerCase();
          let data = res.data.names[lowerName];

          if(data.hacker || !!data.cheatMethods || !!data.status){
            this.bfBanData = data
          }

        })

      })

    })


  }
}
</script>
