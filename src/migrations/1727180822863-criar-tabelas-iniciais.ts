import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriarTabelasIniciais1727180822863 implements MigrationInterface {
  name = 'CriarTabelasIniciais1727180822863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "key" character varying NOT NULL, "category_type" character varying NOT NULL, "sequence" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_1aeb70fe805c6b77ce65f2b2c13" UNIQUE ("key"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_service" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "id_category" integer, "id_service" integer, CONSTRAINT "PK_97e7f2ba2889e200e63db45d915" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result_category" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "ar_qtd" integer NOT NULL, "vd_qtd" integer NOT NULL, "packaging_qtd" integer NOT NULL, "id_result" integer, CONSTRAINT "PK_89adfbf349f100dc43ee0946fc5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "validation_date" TIMESTAMP NOT NULL, "id_user" integer, CONSTRAINT "UQ_f86a70ca54082af5af6eff23256" UNIQUE ("validation_date"), CONSTRAINT "UQ_fa6026de544deabb33c92e3942f" UNIQUE ("id_user", "validation_date"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "target" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" character varying NOT NULL, "service_key" character varying, "extra_service_key" character varying, "service_category" character varying, "value" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d962204b13c18851ea88fc72f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_service" ADD CONSTRAINT "FK_5c02847edeba76dd4e5cfbbf998" FOREIGN KEY ("id_category") REFERENCES "result_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_service" ADD CONSTRAINT "FK_5ee43e84e97a4d0c0f91bd48629" FOREIGN KEY ("id_service") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "result_category" ADD CONSTRAINT "FK_991ba273b11908fb723a1ee7b8b" FOREIGN KEY ("id_result") REFERENCES "result"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "result_category" DROP CONSTRAINT "FK_991ba273b11908fb723a1ee7b8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_service" DROP CONSTRAINT "FK_5ee43e84e97a4d0c0f91bd48629"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_service" DROP CONSTRAINT "FK_5c02847edeba76dd4e5cfbbf998"`,
    );
    await queryRunner.query(`DROP TABLE "target"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(`DROP TABLE "result_category"`);
    await queryRunner.query(`DROP TABLE "category_service"`);
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
