<template>


    <div class="row justify-content-center">
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Event</th>
            <th>Number of Attendees</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eventName in eventData" :key="eventName._id">
            <td>{{eventName.eventName}}</td>
            <td>{{eventName.attendees.length}}</td>
          </tr> 
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from "axios";

 export default {
  data() {
              return {
                //variable (Javascript Object) to hold Events and num of Attendees data coming from backend
                  eventData: [],
              }
          },
          // this is using created hook 
          created() {
            //make call to backend GET students
              let apiURL = import.meta.env.VITE_ROOT_API + '/eventdata/';
              axios.get(apiURL).then(res => {
                  this.eventData = res.data;

              }).catch(error => {
                  console.log(error)
              }); 
          },
          

  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
