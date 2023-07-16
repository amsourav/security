import { useEffect, useState } from "react";

const CUSTOMER_API = () =>
  `https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/customers.json`;
const MESSAGE_API = (id) =>
  `https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/${id}/messages.json`;

function computeTop5MaliciousDomains(items, total) {
  items.sort((a, b) => b[1] - a[1]);

  return items.map((item) => {
    return {
      domain: item[0],
      count: item[1],
      percent: `${((item[1] / total) * 100).toFixed(2)}%`
    };
  });
}

function process(items) {
  const stats = items.reduce(
    (acc, next) => {
      let domain;

      if (next.attackScore > 0.7) {
        acc.attacks += 1;
      }

      if (next.attackType === "SPAM") {
        acc.spam += 1;
      }

      try {
        domain = next?.from?.split("@")[1];
      } catch {
        // if domain not found
      }

      if (acc.maliciousDomains.has(domain)) {
        acc.maliciousDomains.set(domain, acc.maliciousDomains.get(domain) + 1);
      } else {
        acc.maliciousDomains.set(domain, 1);
      }

      return acc;
    },
    {
      maliciousDomains: new Map(),
      attacks: 0,
      spam: 0
    }
  );

  return {
    ...stats,
    top5MaliciousDomains: computeTop5MaliciousDomains(
      Array.from(stats.maliciousDomains),
      items.length
    ).slice(0, 5)
  };
}

export function useMessageDataApi(customerId) {
  const [status, setStatus] = useState("PASSIVE");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (customerId) {
      setStatus("LOADING");
      fetch(MESSAGE_API(customerId))
        .then((e) => e.json())
        .then((e) => {
          setStatus("LOADED");
          setResponse(process(e));
        })
        .catch((err) => {
          setStatus("ERROR");
          setError(err);
        });
    }
  }, [customerId]);

  return [status, response, error];
}

export function useCustomerListApi() {
  const [status, setStatus] = useState("PASSIVE");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("LOADING");
    fetch(CUSTOMER_API())
      .then((e) => e.json())
      .then((e) => {
        setStatus("LOADED");
        setResponse(e);
      })
      .catch((err) => {
        setStatus("ERROR");
        setError(err);
      });
  }, []);

  return [status, response, error];
}
