<script setup>
import St4Absolute from "../../public/images/St4Absolute.vue";
import TeamMember from "@/components/TeamMember.vue";
</script>

<template>
  <section class="st-4">
    <div class="st-4__inner container">
      <St4Absolute/>
      <h2 class="st-4__title section-title h2">Наш команда</h2>
      <ul class="st-4__list">
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/1.jpg"/>
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/2.jpg"/>
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/3.jpg"/>
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/4.jpg"/>
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/5.jpg"/>
        <TeamMember name="Максим Золотарев" about="Администратор" image-url="../../public/images/team members/6.jpg"/>
      </ul>
    </div>
  </section>
</template>