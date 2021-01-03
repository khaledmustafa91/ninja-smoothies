<template>

  <div class="edit-smoothie container" v-if="smoothie">
    <h2 class="center-align">Edit smoothie {{ this.smoothie.title}}</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="filed title">
        <label for="title">Smoothie Title:</label>
        <input type="text" id="title" name="title" v-model="smoothie.title">
      </div>
      <div class="filed description">
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" v-model="smoothie.description">
      </div>
      <div v-for="(ing , index) in smoothie.ingredients" :key="index" class="filed">
        <label for="ingredient">ingredient:</label>
        <input type="text" id="ingredient" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="filed add-ingredient">
        <label for="add-ingredient">Smoothie ingredients:</label>
        <input type="text" id="add-ingredient" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="filed center-align">
        <p class="red-text" v-if="feedback">{{ feedback }} </p>
        <button class="btn pink">Update smoothie</button>
      </div>

    </form>
  </div>

</template>

<script>
import db from '../firebase/init'
import slugify from "slugify";
export default {
  name: "editSmoothie",
  data(){
    return{
      smoothie: null,
      another: null,
      feedback:null
    }
  },
  methods:{
    EditSmoothie(){

      this.smoothie.slug = slugify(this.smoothie.title , {
        replacement: '-',
        remove: /[$*_+~()'"!\-:@]/g,
        lower: true
      });

      db.collection('smoothies').doc(this.smoothie.id).update({
        title: this.smoothie.title,
        description: this.smoothie.description,
        ingredients: this.smoothie.ingredients,
        slug: this.smoothie.slug
      }).then(() => {
        this.$router.push({name: 'index'});
      });
      console.log(this.smoothie);
    },
    addIng(){
      if(this.another){
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      }else
      {
        this.feedback = 'must write ingredient';
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db.collection('smoothies').where('slug' , '==' , this.$route.params.slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
}
</script>

<style scoped>
.edit-smoothie{
  margin-top: 20px;
  padding: 20px;
  max-width:500px;
}
.edit-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-ingredient{
  margin: 20px auto;
}
.edit-smoothie .filed{
  position: relative;
}
.delete{
  position: absolute;
  right: 0px;
  bottom: 16px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
