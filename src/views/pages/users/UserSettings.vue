<template>
  <div>
    <div class="settings">
      <div class="settings__smallTitle">О себе</div>
      <div class="settings__container">
        <label for="img">
          <div
            v-if="user.photo"
            class="settings__container__image user_image"
          >
            <img
              :src="user.photo"
              width="100px"
              height="100px"
            >
            <div class="settings__container-image-icon"></div>
          </div>
          <div
            v-else
            class="settings__container-no-image user_image"
            :style="{'background': user.color}"
          >
            {{user.name.charAt(0)}}
            <div class="settings__container-image-icon">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.38259 1.75531V2.22406H9.85134H12.2274C12.4412 2.22406 12.645 2.30792 12.7942 2.45524C12.9433 2.60235 13.0259 2.80054 13.0259 3.00588V9.49319C13.0259 9.69852 12.9433 9.89672 12.7942 10.0438C12.645 10.1912 12.4412 10.275 12.2274 10.275H8.28711C9.97253 9.69863 11.1907 8.11596 11.1907 6.24985C11.1907 3.89543 9.25149 1.99063 6.88092 1.99063C4.51015 1.99063 2.57243 3.89563 2.57243 6.24985C2.57243 8.11449 3.78803 9.69733 5.47159 10.275H1.53506C1.3213 10.275 1.11753 10.1912 0.968243 10.0438C0.81917 9.89672 0.736572 9.69852 0.736572 9.49319V3.00588C0.736572 2.80054 0.819169 2.60235 0.968243 2.45524C1.11753 2.30792 1.3213 2.22406 1.53506 2.22406H3.91114H4.37989V1.75531V1.28613H9.38259V1.75531ZM6.88098 4.17807L6.93276 4.17806C7.47453 4.19109 7.9902 4.40914 8.37263 4.78644C8.76701 5.17554 8.98746 5.70198 8.98752 6.24959C8.98759 6.79721 8.76727 7.3237 8.37299 7.71289C7.9785 8.10229 7.44211 8.32218 6.8815 8.32225C6.60408 8.32228 6.32952 8.26839 6.07354 8.16379C5.81757 8.05919 5.58538 7.90603 5.39008 7.71334C5.19478 7.52067 5.04019 7.29225 4.93483 7.04131C4.82947 6.79039 4.7753 6.52166 4.77527 6.25041C4.77524 5.97917 4.82933 5.71043 4.93463 5.45948C5.03993 5.20851 5.19447 4.98006 5.38971 4.78734C5.58497 4.5946 5.81712 4.44138 6.07306 4.33673C6.32901 4.23207 6.60356 4.1781 6.88098 4.17807Z"
                  fill="#E2E3E6"
                  stroke="#E2E3E6"
                  stroke-width="0.9375"
                />
              </svg>

            </div>
          </div>
        </label>
        <input
          type="file"
          id="img"
          class="settings__file"
        >
        <div class="settings__container__credentials">
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Введите имя"
            >
          </div>
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Введите свой старый пароль"
            >
          </div>
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Email"
            >
          </div>
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Введите свой новый пароль"
            >
          </div>
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Номер телефона"
            >
          </div>
          <div class="settings__container-group">
            <input
              type="text"
              placeholder="Повторите свой новый пароль"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUserCredentials;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/user-settings.scss";
</style>