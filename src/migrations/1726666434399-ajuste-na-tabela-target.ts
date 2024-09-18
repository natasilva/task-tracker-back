import { MigrationInterface, QueryRunner } from 'typeorm';

export class AjusteNaTabelaTarget1726666434399 implements MigrationInterface {
  name = 'AjusteNaTabelaTarget1726666434399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf")`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "service_key" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "extra_service_key" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "service_category" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "target" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "target" ADD "value" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "target" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "target" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "service_category" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "extra_service_key" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "target" ALTER COLUMN "service_key" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87"`,
    );
  }
}
