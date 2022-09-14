import Vue from 'vue'

const winPercent = {
  title: {
    text: '胜率',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '游戏胜率',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 0, name: '胜场', itemStyle: {color: "#20c19f"}, label: {fontWeight: 'bold'}},
        { value: 0, name: '败场', itemStyle: {color: "#cccccc"}, label: {fontWeight: 'bold'}},
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
    }
  ]
};

const careerRadar = {
  title: {
    text: "兵种擅长",
    left: 'center'
  },
  radar: [
    {
      indicator: [
        { name: '突击兵', max: 0, color: "rgba(0, 0, 0, 1)"},
        { name: '医疗兵', max: 0, color: "rgba(0, 0, 0, 1)"},
        { name: '支援兵', max: 0, color: "rgba(0, 0, 0, 1)"},
        { name: '侦察兵', max: 0, color: "rgba(0, 0, 0, 1)"},
        { name: '飞行员', max: 0, color: "rgba(0, 0, 0, 1)"},
        { name: '坦克长', max: 0, color: "rgba(0, 0, 0, 1)"}
      ],
      splitArea: {
        areaStyle: {
          color: ['#d9d9d9', '#f7f7f7'],
        }
      },
      radius: "50%"
    }
  ],
  aria: {
    enable: true,
    decal: {
      show: true
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  series: [
    //兵种战绩雷达图
    {
      name: '兵种擅长',
      title: '兵种擅长',
      type: 'radar',
      areaStyle: {},
      tooltip: {
        trigger: 'item'
      },
      symbol: 'none',
      data: [
        {
          value: [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          tooltip: {
            formatter: careerRadarTooltipCallback
          }
        }
      ]
    }
  ]
};

function careerRadarTooltipCallback(params){
  let careerKills = Vue.prototype.$gloval.careerKillTotalVal
  let tip = "<h3 class='font-weight-bold'>各兵种击杀情况</h3><br/>"

  if(!!careerKills){
    for(let careerName in careerKills){
      tip += `${careerName}：<span class="font-weight-bold">${careerKills[careerName]}</span><br/>`
    }
  }

  return tip
}

const topKilledBarWithAllMethods = {
  title: {
    text: "击杀总数前十",
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  grid: {
    show: true,
    containLabel: true,
    backgroundColor: "rgba(242, 242, 242, 0.15)",
    borderColor: "rgba(84, 84, 84, 0.33)"
  },
  xAxis: {
    axisLine: { //坐标轴样式
      lineStyle: {
        color: '#6f6f6f',
        width: 10
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      // realtimeSort: true,
      type: 'bar',
      data: [1, 100, 1000, 200, 400],
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      },
      barWidth: "50%",
      tooltip:{
        formatter: '{b}：<span class="font-weight-bold">{c}</span>'
      }
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

const robotCommunityMvpCount = {
  title: {
    text: "Robot机器人社区MVP总计",
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  grid: {
    show: true,
    containLabel: true,
    backgroundColor: "rgba(242, 242, 242, 0.15)",
    borderColor: "rgba(84, 84, 84, 0.33)"
  },
  xAxis: {
    axisLine: { //坐标轴样式
      lineStyle: {
        color: '#6f6f6f',
        width: 10
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      // realtimeSort: true,
      type: 'bar',
      data: [1, 100, 1000, 200, 400],
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      },
      barWidth: "50%",
      tooltip:{
        formatter: '{b}：<span class="font-weight-bold">{c}</span>'
      }
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

const allKilledPie = {
  title: {
    text: '所有击杀方式前十·总览',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    type: "scroll"
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      tooltip: {
        formatter: allKilledPieFormatter
      }
    }
  ]
};

function allKilledPieFormatter(params){
  let data = params.data._originData

  let s = `${((!!data.vehicleName)? data.vehicleName: data.weaponName)}<br/>
            击杀：<span class="font-weight-bold">${data.kills}</span><br/>
            KPM：<span class="font-weight-bold">${data.killsPerMinute}</span><br/>`

  if(!!data.vehicleName){
    s += `时长：<span class="font-weight-bold">${Math.floor(data.timeIn / 3600)}h</span><br/>`
  }else{
    s += `命中率：<span class="font-weight-bold">${data.accuracy}</span><br/>
          爆头率：<span class="font-weight-bold">${data.headshots}</span><br/>`
  }

  return s
}

function vehicleKilledPieFormatter(params){
  let data = params.data._originData

  return `${data.vehicleName}<br/>
            击杀：<span class="font-weight-bold">${data.kills}</span><br/>
            KPM：<span class="font-weight-bold">${data.killsPerMinute}</span><br/>
            时长：<span class="font-weight-bold">${Math.floor(data.timeIn / 3600)}h</span><br/>`
}

function weaponKilledPieFormatter(params){
  let data = params.data._originData

  return `${data.weaponName}<br/>
            击杀：<span class="font-weight-bold">${data.kills}</span><br/>
            KPM：<span class="font-weight-bold">${data.killsPerMinute}</span><br/>
            命中率：<span class="font-weight-bold">${data.accuracy}</span><br/>
            爆头率：<span class="font-weight-bold">${data.headshots}</span><br/>`
}

const weaponKilledPie = {
  title: {
    text: '武器击杀前十·总览',
    left: 'center',
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'left',
    type: "scroll",
    top: '7%'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      tooltip: {
        formatter: weaponKilledPieFormatter
      }
    }
  ]
};

const vehicleKilledPie = {
  title: {
    text: '载具击杀前十·总览',
    left: 'center',
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'left',
    type: "scroll",
    top: '7%'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      tooltip: {
        formatter: vehicleKilledPieFormatter
      }
    }
  ]
};

export default {
  winPercent, careerRadar, topKilledBarWithAllMethods, robotCommunityMvpCount, allKilledPie, weaponKilledPie, vehicleKilledPie
}
