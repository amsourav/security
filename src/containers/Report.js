import Panel from "../components/Panel";
import Table from "../components/Table";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
import { useMessageDataApi } from "../api";

function Report({ customerId }) {
  const [status, response, error = null] = useMessageDataApi(customerId);

  if (!customerId) {
    return <div>Select a customer</div>;
  }

  if (status === "LOADING") {
    return <Spinner />;
  }

  if (error) {
    console.log({
      error
    });
    return <div>Failed to fetch data</div>;
  }

  return (
    <>
      <Container>
        <Panel error count={response?.attacks} label="High Severity Threats" />
        <Panel count={response?.spam} label="Spam Messages" />
      </Container>

      <Container>
        <Table
          header={"Top 5 malicious domains: "}
          columns={[
            { label: "Domain", id: "domain" },
            { label: "% of threats", id: "percent" },
            { label: "# of threats", id: "count" }
          ]}
          rows={response?.top5MaliciousDomains}
        />
      </Container>
    </>
  );
}

export default Report;
