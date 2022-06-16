import express, { Request, Response } from "express";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();


productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output =  await usecase.execute({});
    res.send(output);
});

