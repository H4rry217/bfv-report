function careerKilledStatistic(playerData){
  let killTotal = {
    tank: 0,
    plane: 0,
    medic: 0,
    assault: 0,
    recon: 0,
    support: 0
  }

  for(let veh of playerData.vehicles){
    if(veh.type === '飞机'){
      killTotal.plane += veh.kills
    }else if(veh.type === '坦克'){
      killTotal.tank += veh.kills
    }
  }

  for(let wep of playerData.weapons){
    if(wep.type === '突击步枪' || (wep.type === '半自动步枪' && wep.weaponName !== '红外线狙击步枪')){
      killTotal.assault += wep.kills
    }else if(wep.type === '冲锋枪' || wep.type === '手动枪机卡宾枪'){
      killTotal.medic += wep.kills
    }else if(wep.type === '轻机枪' || wep.type === '霰弹枪' || wep.type === '固定式机枪'){
      killTotal.support += wep.kills
    }else if(wep.type === '单动式步枪' || wep.type === '自动装填步枪' || wep.type === '反器材步枪' || wep.type === '手枪型卡宾枪' || wep.type === '半自动步枪'){
      killTotal.recon += wep.kills
    }
  }

  return killTotal
}

function getTopKilledWithAllMethods(playerData, topNum){
  if(topNum <= 0) return []

  //载具和武器的数据
  let sortData = bubbleSort(playerData.weapons.concat(playerData.vehicles))
  sortData.splice(topNum)
  return sortData
}

//降序
function bubbleSort(data, property){
  if(!property) property = 'kills'

  for (let i = 0; i < data.length; i++) {
    let isSort = true;

    for (let j = 0; j < (data.length - i); j++) {
      if(j !== (data.length - 1)){
        if(data[j][property] < data[j + 1][property]){
          let biggerTemp = data[j + 1];
          data[j + 1] = data[j]
          data[j] = biggerTemp

          isSort = false;
        }
      }
    }

    if(isSort) break
  }

  return data
}

//降序  服了 这点数据都他妈的栈溢出
function quickSort(data){
  if(data.length < 2) return data

  let left = []
  let right = []

  let pivot = data[0]

  for(let val of data){
    if(val.kills > pivot.kills){
      left.push(val)
    }else{
      right.push(val)
    }
  }

  left = quickSort(left)
  right = quickSort(right)


  return left.push(pivot).concat(right)
}

function isProdEnv(){
  return process.env.NODE_ENV === "production"
}

export default {
  careerKilledStatistic, getTopKilledWithAllMethods, bubbleSort, isProdEnv
}
