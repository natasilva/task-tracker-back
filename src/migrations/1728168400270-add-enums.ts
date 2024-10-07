import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnums1728168400270 implements MigrationInterface {
    name = 'AddEnums1728168400270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."service_type_enum" AS ENUM('envio', 'extra')`);
        await queryRunner.query(`ALTER TABLE "service" ADD "type" "public"."service_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "category"`);
        await queryRunner.query(`CREATE TYPE "public"."service_category_enum" AS ENUM('objeto', 'carta')`);
        await queryRunner.query(`ALTER TABLE "service" ADD "category" "public"."service_category_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."service_category_enum"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."service_type_enum"`);
    }

}
