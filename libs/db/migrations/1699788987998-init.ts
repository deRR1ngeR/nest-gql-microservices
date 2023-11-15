import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699788987998 implements MigrationInterface {
    name = 'Init1699788987998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "orderStatus" boolean NOT NULL, "totalAmount" integer NOT NULL, "cartId" integer, "userIdId" integer, CONSTRAINT "REL_d7b6b269e131a5287bd05da4a5" UNIQUE ("cartId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "userIdId" integer, CONSTRAINT "REL_2ea6a897ae31205dd30b400894" UNIQUE ("userIdId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_cart_cart" ("productsId" integer NOT NULL, "cartId" integer NOT NULL, CONSTRAINT "PK_c2edb759e0b0fd4d22e35e74491" PRIMARY KEY ("productsId", "cartId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89f716abc0fdeb0880da981f0e" ON "products_cart_cart" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd8a79485566eefff7975a78a1" ON "products_cart_cart" ("cartId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_2ea6a897ae31205dd30b4008943" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_cart_cart" ADD CONSTRAINT "FK_89f716abc0fdeb0880da981f0e8" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_cart_cart" ADD CONSTRAINT "FK_cd8a79485566eefff7975a78a19" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_cart_cart" DROP CONSTRAINT "FK_cd8a79485566eefff7975a78a19"`);
        await queryRunner.query(`ALTER TABLE "products_cart_cart" DROP CONSTRAINT "FK_89f716abc0fdeb0880da981f0e8"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_2ea6a897ae31205dd30b4008943"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd8a79485566eefff7975a78a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89f716abc0fdeb0880da981f0e"`);
        await queryRunner.query(`DROP TABLE "products_cart_cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
