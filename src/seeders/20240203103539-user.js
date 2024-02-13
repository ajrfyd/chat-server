'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("User", [
      {
        id: "199aff37-334c-4463-a5db-48011c114a55",
        nick_name: "ajrfyd",
        role: "admin",
        profile_img_url: "",
        status: "B",
        latest_connection_id: "",
        latest_contact_time: "2024-01-19 20:22:53",
        latest_ip: "192.168.35.252",
        createdAt: "1989-05-21 20:00:00",
        updatedAt: "1989-05-21 20:00:00",
      },
      {
        id: "c2168408-26c3-4c80-b654-53928d009348",
        nick_name: "test",
        role: "user",
        profile_img_url: "",
        status: "B",
        latest_connection_id: "",
        latest_contact_time: "2024-01-19 20:22:53",
        latest_ip: "192.168.35.252",
        createdAt: "1989-05-21 20:00:00",
        updatedAt: "1989-05-21 20:00:00",
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("User", null, {});
  }
};
