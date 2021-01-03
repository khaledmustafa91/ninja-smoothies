<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add new smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="filed title">
        <label for="title">Smoothie Title:</label>
        <input type="text" id="title" name="title" v-model="title">
      </div>
      <div class="filed description">
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" v-model="description">
      </div>
      <div v-for="(ing , index) in ingredients" :key="index" class="filed">
        <label for="ingredient">ingredient:</label>
        <input type="text" id="ingredient" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="filed add-ingredient">
        <label for="add-ingredient">Smoothie ingredients:</label>
        <input type="text" id="add-ingredient" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="filed center-align">
        <p class="red-text" v-if="feedback">{{ feedback }} </p>
        <button class="btn pink">Add smoothie</button>
      </div>

    </form>
  </div>
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'
export default {
  name: "addSmoothie",
  data(){
    return{
      title:null,
      another: null,
      ingredients: [],
      description: null,
      feedback: null,
      slug: null
    }
  },
  methods:{
    addSmoothie(){
      console.log(this.title);
      console.log(this.ingredients);
      this.slug = slugify(this.title , {
        replacement: '-',
        remove: /[$*_+~()'"!\-:@]/g,
        lower: true
      });
      db.collection('smoothies').add({
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        slug: this.slug
      }).then(() => {
        this.$router.push({name: 'index'});
      });
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      }else
      {
        this.feedback = 'must write ingredient';
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
}
</script>

<style scoped>
.add-smoothie{
  margin-top: 20px;
  padding: 20px;
  max-width:500px;
}
.add-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-ingredient{
  margin: 20px auto;
}
.add-smoothie .filed{
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
