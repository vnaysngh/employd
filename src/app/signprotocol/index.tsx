import { signClient } from "./signClient";

async function attestExperience(
  signer: string = "0x8cAaAB82f1936eb9Dc040D7de84e4AE5405ca8eD"
) {
  try {
    const res = await signClient.createAttestation({
      schemaId: "0x45b",
      data: {
        role: "dfndk",
        start_month: "dlngdlf",
        start_year: "dlndl",
        end_month: "dkfndkfn",
        end_year: "fldnflfn",
        company: "dlnfdlnf",
        employment_type: "skfnsfksn",
        responsibilites: ["we rocked"]
      },
      indexingValue: signer.toLowerCase()
    });
    console.log(res, "create attestation");
  } catch (err) {
    console.log(err);
  }
}

export default attestExperience;
