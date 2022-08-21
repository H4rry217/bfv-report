<template>
  <v-container fluid style="margin-top: 250px;">

    <v-row justify="center">
      <v-col xl="4" md="5" sm="9">
        <v-card rounded="xl" elevation="8">
          <v-card-title>获取你的战地5生涯情况</v-card-title>

          <v-card-text>
            <v-container fluid style="height: 100%;">

              <v-row justify="center" no-gutters>
                <v-col cols="9">
                  <v-text-field
                    @keydown.enter="queryData"
                    label="查询ID"
                    outlined
                    dense
                    v-model="queryName"
                  ></v-text-field>
                </v-col>

                <v-col cols="8">
                  <v-btn block color="primary" @click="queryData">
                    <v-icon>
                      mdi-magnify
                    </v-icon>
                  </v-btn>
                </v-col>

              </v-row>


            </v-container>
          </v-card-text>

          <v-card-text class="text--disabled">
            本站点未对手机端做任何兼容，所以当你使用手机访问本站点时可能会出现排版错乱情况
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'Query',
  data(){
    return{
      queryName: ""
    }
  },
  methods: {
    queryData() {
      let value = this.queryName;
      this.$router.push(
        {
          name:'BFVReportCharts',
          query: {
            id: value,
            background: true
          }
        }
      )
    }
  }
}
</script>
