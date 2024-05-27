import { Request, Response } from "express";
import { InvoicesModel } from "../models/invoices.model";

const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, name, amount, status } = req.body;
    const invoice = await InvoicesModel.query().insert({
      user_id,
      name,
      amount,
      status,
    });
    res.status(201).json({ data: invoice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const paymentInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const invoice = await InvoicesModel.query().patchAndFetchById(id, {
      status: "paid",
    });
    res.status(200).json({ message: "Invoice paid", data: invoice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export { createInvoice, paymentInvoice };
