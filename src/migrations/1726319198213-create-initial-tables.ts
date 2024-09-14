import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1726319198213 implements MigrationInterface {
  name = 'CreateInitialTables1726319198213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "key" character varying NOT NULL, "category" character varying NOT NULL, "has_ar" boolean NOT NULL, "has_vd" boolean NOT NULL, "has_packaging" boolean NOT NULL, "sequence" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_1aeb70fe805c6b77ce65f2b2c13" UNIQUE ("key"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service_result" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "ar_qtd" integer NOT NULL, "vd_qtd" integer NOT NULL, "packaging_qtd" integer NOT NULL, "id_result" integer, "id_service" integer, CONSTRAINT "PK_f3f5719bbb92e714cf314c84343" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "validation_date" TIMESTAMP NOT NULL, "id_user" integer, CONSTRAINT "UQ_f86a70ca54082af5af6eff23256" UNIQUE ("validation_date"), CONSTRAINT "UQ_fa6026de544deabb33c92e3942f" UNIQUE ("id_user", "validation_date"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "target" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "type" character varying NOT NULL, "service_key" character varying NOT NULL, "extra_service_key" character varying NOT NULL, "service_category" character varying NOT NULL, "value" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d962204b13c18851ea88fc72f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_result" ADD CONSTRAINT "FK_f8ef848451f853b17db46cd5f86" FOREIGN KEY ("id_result") REFERENCES "result"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_result" ADD CONSTRAINT "FK_ca794310273d9848c77eb2cf886" FOREIGN KEY ("id_service") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "service_result" DROP CONSTRAINT "FK_ca794310273d9848c77eb2cf886"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_result" DROP CONSTRAINT "FK_f8ef848451f853b17db46cd5f86"`,
    );
    await queryRunner.query(`DROP TABLE "target"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(`DROP TABLE "service_result"`);
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
