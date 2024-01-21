'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add trigger function using raw SQL
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_product_search_vector()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."searchVector" :=
          to_tsvector('english', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, ''));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create the trigger
    await queryInterface.sequelize.query(`
      CREATE TRIGGER product_search_vector_update
      BEFORE INSERT OR UPDATE
      ON products
      FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the trigger and trigger function
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS product_search_vector_update ON products;
      DROP FUNCTION IF EXISTS update_product_search_vector();
    `);
  },
};
