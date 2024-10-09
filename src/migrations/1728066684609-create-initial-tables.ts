import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1728066684609 implements MigrationInterface {
  name = 'CreateInitialTables1728066684609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "key" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "UQ_1aeb70fe805c6b77ce65f2b2c13" UNIQUE ("key"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "id_result" integer, "id_service" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "validation_date" TIMESTAMP NOT NULL, "id_user" integer, CONSTRAINT "UQ_f86a70ca54082af5af6eff23256" UNIQUE ("validation_date"), CONSTRAINT "UQ_fa6026de544deabb33c92e3942f" UNIQUE ("id_user", "validation_date"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "target" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" character varying NOT NULL, "first_service" character varying, "second_service" character varying, "service_category" character varying, "value" double precision NOT NULL, CONSTRAINT "PK_9d962204b13c18851ea88fc72f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_8d7b9defe076f8d2cbbd6ddff94" FOREIGN KEY ("id_result") REFERENCES "result"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_c1062dbf4331b26e05da5cc82e6" FOREIGN KEY ("id_service") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" ADD CONSTRAINT "FK_db7c8dd71939b6eb8c51321dfe1" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "result" DROP CONSTRAINT "FK_db7c8dd71939b6eb8c51321dfe1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_c1062dbf4331b26e05da5cc82e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_8d7b9defe076f8d2cbbd6ddff94"`,
    );
    await queryRunner.query(`DROP TABLE "target"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
