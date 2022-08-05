import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";

exports.main = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) throw new Error("Body does not exist");

  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  if (!body.numbers && !Array.isArray(body.numbers))
    throw new Error("numbers does not exist");

  if (
    body.numbers.filter(
      (numberBody: unknown) => typeof numberBody !== "number"
    ).length > 0
  )
    throw new Error("the numbers are incorrects");

  const result = (body.numbers as number[]).reduce(
    (previous, current) => previous + current
  );

  return {
    statusCode: 200,
    body: result.toString(),
  };
};
