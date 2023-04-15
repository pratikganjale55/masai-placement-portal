import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Input, Space, Popconfirm, message } from "antd";
import "../../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { getData } from "../../Redux/Company/Get/action";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Highlighter from "react-highlight-words";
import MasaiFooter from "../../Components/Footer";
import HamburgerNavbar from "../../Components/HamburgerNavbar/index";

const Compnies = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.getCompany);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(6);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleCreate = () => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let role = authDetails?.userDetails?.role;
    console.log(role);
    if (role === "Admin") {
      navigate("/createPosition");
    } else {
      message.error("You are not authorized, Please contact to Masai Team", 4);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "SL ID",
      dataIndex: "id",
      key: id,
      align: "center",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      key: id,
      title: "COMPANY",
      dataIndex: "companyName",
      align: "center",
      width: "60%",
      ...getColumnSearchProps("companyName"),
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <Space>
              <Button
                type="link"
                onClick={() => navigate(`/companies/${record._id}`)}
              >
                {record.companyName}
              </Button>
            </Space>
          </>
        ) : null,

      filterSearch: true,

      sorter: (record1, record2) => {
        return record1.companyName > record2.companyName;
      },
    },
    {
      key: id,
      title: "INDUSTRY",
      dataIndex: "industry",
      align: "center",
      width: "20%",
      responsive: ["sm"],
      render: (_, record) => {
        return (
          <>
            <p>{record.industry}</p>
          </>
        );
      },
      sorter: (record1, record2) => {
        return record1.industry > record2.industry;
      },

      ...getColumnSearchProps("industry"),
    },

    {
      key: id,
      title: "ACTION",
      align: "center",
      width: "10%",
      render: (_, record) => {
        const authDetails = JSON.parse(localStorage.getItem("authDetails"));
        const role = authDetails?.userDetails?.role;

        const isAdmin = role === "Admin";

        return (
          <>
            <Space>
              <Button
                type="link"
                // disabled={!isAdmin}
                onClick={() => {
                  if (isAdmin) {
                    navigate(`/editCompany/${record._id}`);
                    setOpen(true);
                  } else {
                    message.error(
                      "You are not authorized to edit, Please contact to Masai Team",
                      4
                    );
                  }
                }}
              >
                <EditOutlined />
              </Button>
              <Popconfirm
                title="Sure to delete?"
                disabled={!isAdmin}
                hidden={!isAdmin}
                onConfirm={() => handleDelete(record._id)}
              >
                <a>
                  <DeleteOutlined
                    onClick={() => {
                      if (!isAdmin) {
                        message.error(
                          "You are not authorized to delete, Please contact to Masai Team",
                          4
                        );
                      }
                    }}
                  />
                </a>
              </Popconfirm>
            </Space>
          </>
        );
      },
     
    },
  ];

  const handleDelete = (_id) => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    let token = authDetails?.token;
    fetch(`https://test-production-e6c2.up.railway.app/deleteCompany/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getData());
        message.success("Deleted Successfully");
      })
      .catch((error) => message.error("Something went wrong while Deleting"));
  };

  return (
    <>
      <HamburgerNavbar />
      <div
        style={{
          padding: "1%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 60,
        }}
      >
        <div>
          <h2 style={{ marginTop: "-5px" }}>Companies</h2>
        </div>
        <Button
          type="primary"
          style={{
            float: "right",
            background: "#1F2937",
            width: 100,
            marginTop: "-5px",
          }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
      <div className="CompDiv" style={{ overflow: "auto" }}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record._id}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setpageSize(pageSize);
            },
          }}
        ></Table>
      </div>
      <MasaiFooter />
    </>
  );
};

export default Compnies;
