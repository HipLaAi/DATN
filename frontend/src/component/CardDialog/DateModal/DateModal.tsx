import { Modal, DatePicker, TimePicker, Select, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { updateITimeCardAPI } from "../../../services/Card/Card.service";

const DateModal = (props: any) => {

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [timer, setTimer] = useState<dayjs.Dayjs | null>(null);
  const [currentTimer, setCurrentTimer] = useState<number | null>(null);

  useEffect(() => {
    setStartDate(props.start_date);
    setEndDate(props.end_date);
    setCurrentTimer(props.timer);
    if (props.timer) {
      setCurrentTimer(dayjs(props.end_date).diff(dayjs(props.timer), 'minutes'));
    }
  }, [props.card_id])

  const handleUpdateTime = async () => {
    await updateITimeCardAPI(props.card_id, {
      start_date: (startDate ? startDate.format('YYYY-MM-DD HH:mm:ss') : null),
      end_date: (endDate ? endDate.format('YYYY-MM-DD HH:mm:ss') : null),
      timer: (timer ? timer.format('YYYY-MM-DD HH:mm:ss') : null)
    })
    props.onClose();
    props.setUpdateDate((value: any) => !value);
  }

  return (
    props.isModalDate ? (
      <Modal
        width={300}
        title="Ngày"
        open={props.isOpen}
        footer={null}
        onCancel={props.onClose}
        style={{ marginRight: 400, marginTop: 240 }}
      >
        <div style={{ marginBottom: 16 }}>
          <Checkbox
            checked={startDate !== null}
            onChange={(e) =>
              setStartDate(e.target.checked ? dayjs() : null)
            }
          >
            Ngày bắt đầu
          </Checkbox>
          {startDate && (
            <DatePicker
              value={dayjs(startDate)}
              onChange={(date) => setStartDate(date)}
              style={{ width: "100%" }}
            />
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <Checkbox
            checked={endDate !== null}
            onChange={(e) =>
              setEndDate(e.target.checked ? dayjs() : null)
            }
          >
            Ngày hết hạn
          </Checkbox>
          {endDate && (
            <div style={{ display: "flex", gap: 8 }}>
              <DatePicker
                value={dayjs(endDate)}
                onChange={(date) => setEndDate(date)}
              />
              <TimePicker
                value={dayjs(endDate)}
                onChange={(time) =>
                  setEndDate(endDate?.set("hour", time?.hour() || 0).set("minute", time?.minute() || 0))
                }
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <span>Thiết lập Nhắc nhở</span>
          <Select
            value={currentTimer}
            onChange={(value: any) => {
              if (value === null) {
                setTimer(null);
              } else {
                setTimer(dayjs(endDate).subtract(value, 'minutes'));
              }
              setCurrentTimer(value)
            }}
            style={{ width: "100%", marginTop: 8 }}
          >
            <Select.Option value={null}>Không có</Select.Option>
            <Select.Option value={0}>Vào thời điểm hết hạn</Select.Option>
            <Select.Option value={5}>5 Phút trước</Select.Option>
            <Select.Option value={10}>10 Phút trước</Select.Option>
          </Select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={props.onClose}>Gỡ bỏ</Button>
          <Button type="primary" onClick={handleUpdateTime}>
            Lưu
          </Button>
        </div>
      </Modal>
    ) : (
      <>
        <div style={{width: "250px"}}>
          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={startDate !== null}
              onChange={(e) =>
                setStartDate(e.target.checked ? dayjs() : null)
              }
            >
              Ngày bắt đầu
            </Checkbox>
            {startDate && (
              <DatePicker
                value={dayjs(startDate)}
                onChange={(date) => setStartDate(date)}
                style={{ width: "100%" }}
              />
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <Checkbox
              checked={endDate !== null}
              onChange={(e) =>
                setEndDate(e.target.checked ? dayjs() : null)
              }
            >
              Ngày hết hạn
            </Checkbox>
            {endDate && (
              <div style={{ display: "flex", gap: 8 }}>
                <DatePicker
                  value={dayjs(endDate)}
                  onChange={(date) => setEndDate(date)}
                />
                <TimePicker
                  value={dayjs(endDate)}
                  onChange={(time) =>
                    setEndDate(endDate?.set("hour", time?.hour() || 0).set("minute", time?.minute() || 0))
                  }
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <span>Thiết lập Nhắc nhở</span>
            <Select
              value={currentTimer}
              onChange={(value: any) => {
                if (value === null) {
                  setTimer(null);
                } else {
                  setTimer(dayjs(endDate).subtract(value, 'minutes'));
                }
                setCurrentTimer(value)
              }}
              style={{ width: "100%", marginTop: 8 }}
            >
              <Select.Option value={null}>Không có</Select.Option>
              <Select.Option value={0}>Vào thời điểm hết hạn</Select.Option>
              <Select.Option value={5}>5 Phút trước</Select.Option>
              <Select.Option value={10}>10 Phút trước</Select.Option>
            </Select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button type="primary" onClick={handleUpdateTime}>
              Lưu
            </Button>
          </div>
        </div>
      </>
    )
  );
};

export default DateModal;
