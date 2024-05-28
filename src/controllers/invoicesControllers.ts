import { Request, Response } from "express";
import { InvoicesModel } from "../models/invoices.model";
import { v4 } from "uuid";

const getPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoices = await InvoicesModel.query().select(
      "id",
      "name",
      "amount",
      "status"
    );
    res.status(200).json({ data: invoices });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, amount, status } = req.body;
    const invoice = await InvoicesModel.query().insert({
      id: v4(),
      user_id: v4(),
      name,
      amount,
      status,
    });

    const { user_id, ...invoices } = invoice;

    res.status(201).json({ status: true, data: invoices });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const paymentInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const invoice = await InvoicesModel.query()
      .patchAndFetchById(id, {
        status: "paid",
      })
      .select("id", "name", "amount", "status");

    res
      .status(200)
      .json({ status: true, message: "Invoice paid", data: invoice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

export { createInvoice, paymentInvoice, getPayment };
