<template>
  <div class="" style="padding: 20px 100px 0 100px">
    <div class="row">
      <div class="col s6 m4 content" v-for="smooth in smoothies">
        <div class="card">
          <div class="card-content">
            <i class="material-icons delete" @click="deleteSmoothie(smooth.id)">delete</i>

            <h5 class="indigo-text">{{ smooth.title}}</h5>
            <p>{{smooth.description}}</p>
            <ul class="ing">
              <li v-for="ingredient in smooth.ingredients">
                <span class="chip">{{ ingredient }}</span>
              </li>
            </ul>

            <a href="" class="btn-floating btn-large halfway-fab pink">
              <router-link :to="{name : 'editSmoothie' , params: {slug: smooth.slug}}">
                <i class="material-icons">edit</i>
              </router-link>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init.js'
export default {
  name: "index",
  data(){
    return {
      smoothies:[]
    }
  },
  methods:{
    deleteSmoothie: function (id){
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id;
        });
      });

    }
  },
  created() {
      db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        let smoothie = doc.data();
        smoothie.id = doc.id;
        this.smoothies.push(smoothie);
      });
    });
  }
}
</script>

<style scoped>
.card{
  max-height: 190px;

}
ul li{
  display: inline-block;
}
.delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
