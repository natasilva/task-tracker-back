import { MigrationInterface, QueryRunner } from 'typeorm';

export class AjusteNoUpdatedAt1726367481915 implements MigrationInterface {
  name = 'AjusteNoUpdatedAt1726367481915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "result" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "result" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
  }
}
