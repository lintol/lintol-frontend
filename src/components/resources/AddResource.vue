<template>
  <div id="addResource">
    <h1>{{ title }}</h1>
    <p>Add a link to a resource to be validated</p>
    <div class="vertical">
    <input id="resourceLink" placeholder="Resource Link" type="text" v-model=resourceUrl data-vv-name="resourceUrl" data-vv-as="Resource Url" v-validate="'required'" :class="{ warningBorder: errors.has('resourceUrl') }"/>
    <p v-show="errors.has('resourceUrl')" class="warningText" >{{ errors.first('resourceUrl') }}</p>
    <select>
      <option value="">Choose Profile</option>
      <option value="profile.name" v-for="profile in profiles">{{ profile.name }}</option>
    </select>
    <input type="button" class="addButton" value="Validate" @click="addResource"/>
  </div>
  </div>
</template>

<script>
export default {
  name: 'AddResource',
  data () {
    return {
      title: 'Add Resource',
      resourceUrl: '',
      profiles: []
    };
  },
  methods: {
    getProfiles: function () {
      this.profiles = [];
    },
    addResource: function () {
      this.$validator.validateAll().then(() => {
        this.$router.push({name: 'resourceTable'});
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vertical {
   margin-top: 200px;
   width: 350px;
   display: flex;
   flex-direction: column;
   justify-content: center;
}
</style>
