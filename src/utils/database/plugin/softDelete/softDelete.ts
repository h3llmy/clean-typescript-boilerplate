import mongoose, { CallbackError, SaveOptions } from "mongoose";

export default function softDeletePlugin(schema: mongoose.Schema) {
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  schema.pre(
    "find",
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: { $ne: true } });
      next();
    }
  );

  schema.pre(
    "count",
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: { $ne: true } });
      next();
    }
  );

  schema.pre(
    "countDocuments",
    async function (this, next: (err?: CallbackError) => void) {
      if (this.getFilter().isDeleted === true) {
        return next();
      }
      this.setQuery({ ...this.getFilter(), isDeleted: { $ne: true } });
      next();
    }
  );

  schema.static("findDeleted", async function () {
    return this.find({ isDeleted: true });
  });

  schema.static("restore", async function (query) {
    const updatedQuery = {
      ...query,
      isDeleted: true,
    };
    const deletedTemplates = await this.find(updatedQuery);
    if (!deletedTemplates) {
      return Error("element not found");
    }
    let restored = 0;
    for (const deletedTemplate of deletedTemplates) {
      if (deletedTemplate.isDeleted) {
        deletedTemplate.$isDeleted(false);
        deletedTemplate.isDeleted = false;
        deletedTemplate.deletedAt = null;
        await deletedTemplate
          .save()
          .then(() => restored++)
          .catch((e: mongoose.Error) => {
            throw new Error(`${e.name} ${e.message}`);
          });
      }
    }
    return { restored };
  });

  schema.static("softDelete", async function (query, options?: SaveOptions) {
    const templates = await this.find(query).orFail(
      new Error("Element not found")
    );
    let deleted = 0;
    for (const template of templates) {
      if (!template.isDeleted) {
        template.$isDeleted(true);
        template.isDeleted = true;
        template.deletedAt = new Date();
        await template
          .save(options)
          .then(() => deleted++)
          .catch((e: mongoose.Error) => {
            throw new Error(`${e.name} ${e.message}`);
          });
      }
    }
    return { deleted };
  });
}
