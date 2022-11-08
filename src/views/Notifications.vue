<template>
  <v-container style="background-color: #fafafa" fluid>
    <v-flex xs12 sm6 offset-sm3 pt-2>
      <form>
        <v-layout column>
          <v-container>
            <v-row>
              <span class="my-application3 px-4" style="font-size: 30px"
                >Notificaciones</span
              >
            </v-row>
            <v-row>
              <v-list class="wrapper mt-4" style="offset-position: left">
                <template>
                  <template v-for="(item, i) in notifications">
                    <v-list-item
                      @click="readNotification(item)"
                      lines="two"
                      :key="i"
                      class="pb-4"
                    >
                      <v-row>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12" md="1">
                              <v-icon color="primary" class="mx-2"
                                >notifications</v-icon
                              >
                            </v-col>
                            <v-col cols="12" md="10">
                              <b> {{ item.notificationType.name }}</b>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="12" md="1"> </v-col>
                            <v-col cols="12" md="10">
                              <span>
                                {{ item.body }}
                              </span>
                            </v-col>
                          </v-row>

                          <v-row no-gutters>
                            <v-col cols="12" md="1"> </v-col>
                            <v-col cols="12" md="10">
                              <span
                                class="my-application3"
                                style="color: #1b5e20"
                              >
                                {{ getYears(item.createdAt) }}
                              </span>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-list-item>
                    <v-divider class="mt-2 mb-4"></v-divider>
                  </template>
                  <v-list-item class="pb-14" v-if="notifications.length == 0">
                    <v-row justify="center" align="center">
                      <span>No tienes notificaciones</span>
                    </v-row>
                  </v-list-item>
                </template>
              </v-list>
            </v-row>
          </v-container>
        </v-layout>
      </form>
    </v-flex>
  </v-container>
</template>
<script>
import { GET_NOTIICATIONS, COUNT_NOTIFICATIONS } from "../gql/queries";
import { READ_NOTIFICAION } from "../gql/mutation";
import moment from "moment";
export default {
  name: "my-perfil",
  data() {
    return {
      notifications: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getNotifications() {
      const cNotifications = await this.$apollo.query({
        query: COUNT_NOTIFICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
      });
    },
    async readNotification(item) {
      try {
        var data = await this.$apollo.mutate({
          mutation: READ_NOTIFICAION,
          variables: {
            notificationId: item.rowId,
          },
          update: await this.getNotifications(),
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
      }
    },
    getYears(year) {
      moment.locale("es");
      return moment(year).fromNow();
    },
    async getData() {
      var notification = await this.$apollo.query({
        query: GET_NOTIICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
      });

      this.notifications = notification.data.notifications.nodes;
    },
  },
  computed: {
    profile() {
      return this.$store.state.Auth;
    },
  },
};
</script>
